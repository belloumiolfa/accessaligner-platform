
CREATE TABLE profile (
    profile_id BIGINT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    date_of_birth DATETIME(6),
    description VARCHAR(255),
    profession VARCHAR(255),
    phone VARCHAR(255),
    mobile VARCHAR(255),
    address VARCHAR(255),
    created_at DATETIME(6),
    updated_at DATETIME(6),
    tax VARCHAR(255),
    photo_file_id BIGINT,
    PRIMARY KEY (profile_id),
    CONSTRAINT uk_profile_photo UNIQUE (photo_file_id)
) ENGINE=InnoDB;

CREATE TABLE `role` (
    role_id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    description VARCHAR(255),
    PRIMARY KEY (role_id)
) ENGINE=InnoDB;

CREATE TABLE status (
    status_id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    description VARCHAR(255),
    PRIMARY KEY (status_id)
) ENGINE=InnoDB;

CREATE TABLE `user` (
    user_id BIGINT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    created_at DATETIME(6),
    updated_at DATETIME(6),
    updated_last BIT,
    profile_id BIGINT,
    PRIMARY KEY (user_id),
    CONSTRAINT uk_user_profile UNIQUE (profile_id),
    CONSTRAINT fk_user_profile FOREIGN KEY (profile_id) REFERENCES profile (profile_id)
) ENGINE=InnoDB;

CREATE TABLE admin (
    user_id BIGINT NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_admin_user FOREIGN KEY (user_id) REFERENCES `user` (user_id)
) ENGINE=InnoDB;

CREATE TABLE doctor (
    user_id BIGINT NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_doctor_user FOREIGN KEY (user_id) REFERENCES `user` (user_id)
) ENGINE=InnoDB;

CREATE TABLE patient (
    patient_id BIGINT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    birthday DATETIME(6),
    sex VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    disease VARCHAR(255),
    address VARCHAR(255),
    comment VARCHAR(255),
    created_at DATETIME(6),
    updated_at DATETIME(6),
    nbr_treat INT NOT NULL,
    doctor BIGINT,
    PRIMARY KEY (patient_id),
    CONSTRAINT fk_patient_doctor FOREIGN KEY (doctor) REFERENCES doctor (user_id)
) ENGINE=InnoDB;

CREATE TABLE treatment (
    treatment_id BIGINT NOT NULL AUTO_INCREMENT,
    ant_cross VARCHAR(255),
    class_i VARCHAR(255),
    crowding VARCHAR(255),
    extract VARCHAR(255),
    gap VARCHAR(255),
    overbite VARCHAR(255),
    treat VARCHAR(255),
    post_cross VARCHAR(255),
    reduce_overbite VARCHAR(255),
    status INT,
    previous_status VARCHAR(255),
    description VARCHAR(255),
    teeth_comment VARCHAR(255),
    photos_comment VARCHAR(255),
    clinics_comment VARCHAR(255),
    created_at DATETIME(6),
    updated_at DATETIME(6),
    patient BIGINT,
    PRIMARY KEY (treatment_id),
    CONSTRAINT fk_treatment_patient FOREIGN KEY (patient) REFERENCES patient (patient_id)
) ENGINE=InnoDB;

CREATE TABLE plan (
    id BIGINT NOT NULL AUTO_INCREMENT,
    status INT,
    delevery_date DATETIME(6),
    comment VARCHAR(255),
    feed_back VARCHAR(255),
    code VARCHAR(255),
    production_days BIGINT,
    created_at DATETIME(6),
    updated_at DATETIME(6),
    treatment BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT fk_plan_treatment FOREIGN KEY (treatment) REFERENCES treatment (treatment_id)
) ENGINE=InnoDB;

CREATE TABLE `file` (
    file_id BIGINT NOT NULL AUTO_INCREMENT,
    created_at DATETIME(6),
    name VARCHAR(255),
    type VARCHAR(255),
    `role` VARCHAR(255),
    size BIGINT,
    treatment_treatment_id BIGINT,
    plan_id BIGINT,
    PRIMARY KEY (file_id),
    CONSTRAINT fk_file_treatment FOREIGN KEY (treatment_treatment_id) REFERENCES treatment (treatment_id),
    CONSTRAINT fk_file_plan FOREIGN KEY (plan_id) REFERENCES plan (id)
) ENGINE=InnoDB;

CREATE TABLE estimate (
    id BIGINT NOT NULL AUTO_INCREMENT,
    status INT,
    created_at DATETIME(6),
    blob_url VARCHAR(255),
    file_file_id BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT uk_estimate_file UNIQUE (file_file_id),
    CONSTRAINT fk_estimate_file FOREIGN KEY (file_file_id) REFERENCES `file` (file_id)
) ENGINE=InnoDB;

CREATE TABLE teeth (
    teeth_id BIGINT NOT NULL AUTO_INCREMENT,
    num INT NOT NULL,
    action INT,
    treatment_treatment_id BIGINT,
    PRIMARY KEY (teeth_id),
    CONSTRAINT fk_teeth_treatment FOREIGN KEY (treatment_treatment_id) REFERENCES treatment (treatment_id)
) ENGINE=InnoDB;

CREATE TABLE event (
    event_id BIGINT NOT NULL AUTO_INCREMENT,
    `start` DATETIME(6),
    `end` DATETIME(6),
    title VARCHAR(255),
    risk VARCHAR(255),
    created_at DATETIME(6),
    PRIMARY KEY (event_id)
) ENGINE=InnoDB;

CREATE TABLE message (
    message_id BIGINT NOT NULL AUTO_INCREMENT,
    text VARCHAR(255),
    created_at DATETIME(6),
    sender BIGINT,
    treatment BIGINT,
    PRIMARY KEY (message_id),
    CONSTRAINT fk_message_sender FOREIGN KEY (sender) REFERENCES `user` (user_id),
    CONSTRAINT fk_message_treatment FOREIGN KEY (treatment) REFERENCES treatment (treatment_id)
) ENGINE=InnoDB;

CREATE TABLE email (
    email_id BIGINT NOT NULL AUTO_INCREMENT,
    subject VARCHAR(255),
    sent_to VARCHAR(255),
    sender VARCHAR(255),
    content LONGTEXT,
    created_at DATETIME(6),
    PRIMARY KEY (email_id)
) ENGINE=InnoDB;

CREATE TABLE user_role (
    `user` BIGINT NOT NULL,
    `role` BIGINT NOT NULL,
    PRIMARY KEY (`user`, `role`),
    CONSTRAINT fk_user_role_user FOREIGN KEY (`user`) REFERENCES `user` (user_id),
    CONSTRAINT fk_user_role_role FOREIGN KEY (`role`) REFERENCES `role` (role_id)
) ENGINE=InnoDB;

CREATE TABLE user_event (
    `user` BIGINT NOT NULL,
    `event` BIGINT NOT NULL,
    PRIMARY KEY (`user`, `event`),
    CONSTRAINT fk_user_event_user FOREIGN KEY (`user`) REFERENCES `user` (user_id),
    CONSTRAINT fk_user_event_event FOREIGN KEY (`event`) REFERENCES event (event_id)
) ENGINE=InnoDB;

CREATE TABLE message_user (
    message_message_id BIGINT NOT NULL,
    seen_by_user_id BIGINT NOT NULL,
    PRIMARY KEY (message_message_id, seen_by_user_id),
    CONSTRAINT fk_message_seen_message FOREIGN KEY (message_message_id) REFERENCES message (message_id),
    CONSTRAINT fk_message_seen_user FOREIGN KEY (seen_by_user_id) REFERENCES `user` (user_id)
) ENGINE=InnoDB;

CREATE TABLE user_status (
    responsible BIGINT,
    `user` BIGINT NOT NULL,
    status BIGINT NOT NULL,
    updated_at DATETIME(6),
    updated_last BIT,
    comment VARCHAR(255),
    PRIMARY KEY (`user`, status),
    CONSTRAINT fk_user_status_responsible FOREIGN KEY (responsible) REFERENCES `user` (user_id),
    CONSTRAINT fk_user_status_user FOREIGN KEY (`user`) REFERENCES `user` (user_id),
    CONSTRAINT fk_user_status_status FOREIGN KEY (status) REFERENCES status (status_id)
) ENGINE=InnoDB;

CREATE TABLE treatment_team (
    responsible BIGINT NOT NULL,
    project BIGINT NOT NULL,
    created_at DATETIME(6),
    PRIMARY KEY (responsible, project),
    CONSTRAINT fk_treatment_team_admin FOREIGN KEY (responsible) REFERENCES admin (user_id),
    CONSTRAINT fk_treatment_team_treatment FOREIGN KEY (project) REFERENCES treatment (treatment_id)
) ENGINE=InnoDB;

ALTER TABLE profile
    ADD CONSTRAINT fk_profile_photo FOREIGN KEY (photo_file_id) REFERENCES `file` (file_id);
