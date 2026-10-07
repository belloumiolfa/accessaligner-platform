package access.aligner.backend.Services.Implimentation;

import access.aligner.backend.Entities.Email;
import access.aligner.backend.Entities.User;
import access.aligner.backend.Repositories.EmailRepository;
import access.aligner.backend.Services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.ResourceBundle;


@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;
    private final EmailRepository emailRepository;
    @Value("${spring.mail.username}")
    private String defaultEmail;
    @Autowired
    private TemplateEngine templateEngine;
    ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Override
    public Email addEmail(Email email) {
        return emailRepository.save(email);
    }
    @SneakyThrows
    @Override
    public void sendEmailVerification(User user, String jwt) {
        // Generate the context
        Context context = new Context();
        context.setVariable("token", jwt);

        // Process the template to create the email body
        String body = templateEngine.process("Verification", context);

        // Create a MimeMessage for HTML email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true); // true indicates multipart message

        try {
            helper.setFrom(defaultEmail);
            helper.setTo(user.getEmail());
            helper.setSubject(messages.getString("EmailService.sendEmailVerification.subject"));
            helper.setText(body, true); // true indicates that the body is HTML

            // Send the email
            mailSender.send(mimeMessage);

            // Log or save the email details as needed
            addEmail(Email.builder()
                    .subject(messages.getString("EmailService.sendEmailVerification.subject"))
                    .sentTo(user.getEmail())
                    .sender(defaultEmail)
                    .content(body)
                    .build());

        } catch (MessagingException e) {
            e.printStackTrace(); // Handle the exception as needed
        }
    }

    /*@Override
    public void sendEmailVerification(User user, String jwt) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        // Generate the context
        Context context = new Context();
        context.setVariable("token",jwt);

        String body = templateEngine.process("Verification", context);

        mailMessage.setFrom(defaultEmail);
        mailMessage.setTo(user.getEmail());
        mailMessage.setText(body);
        mailMessage.setSubject(messages.getString("EmailService.sendEmailVerification.subject"));

        mailSender.send(mailMessage);

        addEmail(Email
                .builder()
                .subject(messages.getString("EmailService.sendEmailVerification.subject"))
                .sentTo(user.getEmail())
                .sender(defaultEmail)
                .content(body)
                .build()
        );
    }*/
    @SneakyThrows
    @Override
    public void sendEmailDecision(Long userId, User admin, String jwt) {
        // Generate the context
        Context context = new Context();
        context.setVariable("token", jwt);
        context.setVariable("user", userId); // Consider using userId or user object directly

        // Process the template to create the email body
        String body = templateEngine.process("Decision", context);

        // Create a MimeMessage for HTML email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true); // true indicates multipart message

        try {
            helper.setFrom(defaultEmail);
            helper.setTo(admin.getEmail());
            helper.setSubject(messages.getString("EmailService.sendEmailDecision.subject"));
            helper.setText(body, true); // true indicates that the body is HTML

            // Send the email
            mailSender.send(mimeMessage);

            // Log or save the email details as needed
            addEmail(Email.builder()
                    .subject(messages.getString("EmailService.sendEmailDecision.subject"))
                    .sentTo(admin.getEmail())
                    .sender(defaultEmail)
                    .content(body)
                    .build());

        } catch (MessagingException e) {
            e.printStackTrace(); // Handle the exception as needed
        }
    }
    /*
    @Override
    public void sendEmailDecision(Long user,User admin, String jwt) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        // Generate the context
        Context context = new Context();
        context.setVariable("token",jwt);
        context.setVariable("user",user);

        String body = templateEngine.process("Decision", context);

        mailMessage.setFrom(defaultEmail);
        mailMessage.setTo(admin.getEmail());
        mailMessage.setText(body);
        mailMessage.setSubject(messages.getString("EmailService.sendEmailDecision.subject"));

        mailSender.send(mailMessage);
        addEmail(Email
                .builder()
                .subject(messages.getString("EmailService.sendEmailDecision.subject"))
                .sentTo(admin.getEmail())
                .sender(defaultEmail)
                .content(body)
                .build()
        );
    }*/
    @Override
    public void sendEmailUpdatePassword(String email, String jwt) {
        // Generate the context
        Context context = new Context();
        context.setVariable("token", jwt);

        // Process the template to create the email body
        String body = templateEngine.process("Password", context);

        // Create a MimeMessage for HTML email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = null; // true indicates multipart message
        try {
            helper = new MimeMessageHelper(mimeMessage, true);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        try {
            helper.setFrom(defaultEmail);
            helper.setTo(email);
            helper.setSubject(messages.getString("EmailService.sendEmailUpdatePassword.subject"));
            helper.setText(body, true); // true indicates that the body is HTML

            // Send the email
            mailSender.send(mimeMessage);

            // Log or save the email details as needed
            addEmail(Email.builder()
                    .subject(messages.getString("EmailService.sendEmailUpdatePassword.subject"))
                    .sentTo(email)
                    .sender(defaultEmail)
                    .content(body)
                    .build());

        } catch (MessagingException e) {
            e.printStackTrace(); // Handle the exception as needed
        }
    }
    /*
    @Override
    public void sendEmailUpdatePassword(String email,String jwt) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        // Generate the context
        Context context = new Context();
        context.setVariable("token",jwt);

        String body = templateEngine.process("Password", context);

        mailMessage.setFrom(defaultEmail);
        mailMessage.setTo(email);
        mailMessage.setText(body);
        mailMessage.setSubject(messages.getString("EmailService.sendEmailUpdatePassword.subject"));

        mailSender.send(mailMessage);

        addEmail(Email
                .builder()
                .subject(messages.getString("EmailService.sendEmailUpdatePassword.subject"))
                .sentTo(email)
                .sender(defaultEmail)
                .content(body)
                .build()
        );
    }
*/
    @Override
    public void sendEmailAdminCredential(User user, String jwt, String userName, String password) throws MessagingException {
        // Generate the context
        Context context = new Context();
        context.setVariable("token", jwt);
        context.setVariable("userName", userName);
        context.setVariable("password", password);

        // Process the template to create the email body
        String body = templateEngine.process("Credential", context);

        // Create a MimeMessage for HTML email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true); // true indicates multipart message

        try {
            helper.setFrom(defaultEmail);
            helper.setTo(user.getEmail());
            helper.setSubject(messages.getString("EmailService.sendEmailAdminCredential.subject"));
            helper.setText(body, true); // true indicates that the body is HTML

            // Send the email
            mailSender.send(mimeMessage);

            // Log or save the email details as needed
            addEmail(Email.builder()
                    .subject(messages.getString("EmailService.sendEmailAdminCredential.subject"))
                    .sentTo(user.getEmail())
                    .sender(defaultEmail)
                    .content(body)
                    .build());

        } catch (MessagingException e) {
            e.printStackTrace(); // Handle the exception as needed
        }
    }
    /*
        @Override
        public void sendEmailAdminCredential(User user, String jwt,String userName,String password) {
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            // Generate the context
            Context context = new Context();
            context.setVariable("token",jwt);
            context.setVariable("userName",userName);
            context.setVariable("password",password);

            String body = templateEngine.process("Credential", context);

            mailMessage.setFrom(defaultEmail);
            mailMessage.setTo(user.getEmail());
            mailMessage.setText(body);
            mailMessage.setSubject(messages.getString("EmailService.sendEmailAdminCredential.subject"));

            mailSender.send(mailMessage);

            addEmail(Email
                    .builder()
                    .subject(messages.getString("EmailService.sendEmailAdminCredential.subject"))
                    .sentTo(user.getEmail())
                    .sender(defaultEmail)
                    .content(body)
                    .build()
            );
        }*/
    @SneakyThrows
    @Override
    public void sendRegistrationRejection(User user, String reason) {

        //String subject = "Registration Request Rejected";

        String body = """
            Hello %s %s,

            We are sorry to inform you that your registration request has been rejected.

            Reason:
            %s

            If you believe this decision was made in error, please contact our support team.

            Best regards,
            AccessAligner Team
            """.formatted(
                user.getProfile().getFirstName(),
                user.getProfile().getLastName(),
                reason != null && !reason.isBlank()
                        ? reason
                        : "No reason was provided."
        );

        // Generate the context
        //Context context = new Context();

        // Process the template to create the email body

        // Create a MimeMessage for HTML email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        // true indicates multipart message

        try {
            helper.setFrom(defaultEmail);
            helper.setTo(user.getEmail());
            helper.setSubject(messages.getString("EmailService.sendRejectEmail.subject"));
            helper.setText(body, true); // true indicates that the body is HTML

            // Send the email
            mailSender.send(mimeMessage);

            // Log or save the email details as needed
            addEmail(Email.builder()
                    .subject(messages.getString("EmailService.sendRejectEmail.subject"))
                    .sentTo(user.getEmail())
                    .sender(defaultEmail)
                    .content(body)
                    .build());

        } catch (MessagingException e) {
            e.printStackTrace(); // Handle the exception as needed
        }

    }

}
