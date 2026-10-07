package access.aligner.backend.Configuration;

import access.aligner.backend.Entities.User;
import access.aligner.backend.AdvicerController.InvalidVerificationTokenException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;
    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;
    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshExpiration;
    public String extractUserName(String jwt) {
        return extractClaim(jwt, Claims::getSubject);
    }
    public <T> T extractClaim(String jwt, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(jwt);
        return claimsResolver.apply(claims);
    }
    public String generateToken(Map<String, Object> extraClaims, User userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }
    public String generateRefreshToken(User userDetails) {
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }

    public String generatePasswordResetToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("purpose", "PASSWORD_RESET");
        return buildToken(claims, user, jwtExpiration);
    }

    public Long extractPasswordResetUserId(String token) {
        try {
            Claims claims = extractAllClaims(token);
            if (!"PASSWORD_RESET".equals(claims.get("purpose", String.class))) {
                throw new InvalidVerificationTokenException("Invalid or expired password reset token.");
            }
            Long userId = claims.get("userId", Long.class);
            if (userId == null || claims.getSubject() == null) {
                throw new InvalidVerificationTokenException("Invalid or expired password reset token.");
            }
            return userId;
        } catch (JwtException | IllegalArgumentException exception) {
            throw new InvalidVerificationTokenException("Invalid or expired password reset token.");
        }
    }
    public String buildToken(Map<String, Object> extraClaims, User user, long expiration) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256).compact();
    }
    public boolean isTokenValid(String token, User userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getEmail()) && !isTokenExpired(token));
    }
    public boolean isTokenExpired(String jwt) {
        return extractExpiration(jwt).before(new Date());
    }
    public Date extractExpiration(String jwt) {
        return extractClaim(jwt, Claims::getExpiration);
    }
    public Claims extractAllClaims(String jwt) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }
    public Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateConfirmationToken(User user) {

        Map<String, Object> claims = new HashMap<>();

        claims.put("userId", user.getId());
        claims.put("purpose", "EMAIL_VERIFICATION");

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(
                        System.currentTimeMillis() + 60 * 60 * 1000
                )) // 1 hour
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isConfirmationTokenValid(String token) {
        try {
            Claims claims = extractAllClaims(token);

            return "EMAIL_VERIFICATION".equals(
                    claims.get("purpose", String.class)
            );

        } catch (JwtException | IllegalArgumentException e) {

            return false;
        }

    }

}
