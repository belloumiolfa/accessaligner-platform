package access.aligner.backend.Services;

import access.aligner.backend.Entities.Email;
import access.aligner.backend.Entities.User;
import jakarta.mail.MessagingException;
import lombok.SneakyThrows;

public interface EmailService {
    Email addEmail(Email email);
    @SneakyThrows
    void sendEmailVerification(User user, String jwt);
    @SneakyThrows
    void sendEmailDecision(Long user,User admin, String jwt);
    @SneakyThrows
    void sendEmailUpdatePassword(String email , String jwt);
    @SneakyThrows
    void sendEmailAdminCredential(User user, String jwt,String userName,String password) throws MessagingException;

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
    void sendRegistrationRejection(User user, String reason);
}
