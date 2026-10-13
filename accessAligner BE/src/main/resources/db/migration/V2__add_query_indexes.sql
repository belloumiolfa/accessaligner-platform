CREATE INDEX idx_user_email ON `user` (email);
CREATE INDEX idx_user_user_name ON `user` (user_name);
CREATE INDEX idx_patient_doctor ON patient (doctor);
CREATE INDEX idx_treatment_patient ON treatment (patient);
CREATE INDEX idx_treatment_status ON treatment (status);
