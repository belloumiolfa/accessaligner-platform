ALTER TABLE `user`
    DROP INDEX idx_user_email,
    ADD CONSTRAINT uk_user_email UNIQUE (email);

ALTER TABLE `user`
    DROP INDEX idx_user_user_name,
    ADD CONSTRAINT uk_user_user_name UNIQUE (user_name);
