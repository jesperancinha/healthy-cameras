DROP TABLE IF EXISTS hc_user;
CREATE TABLE hc_user
(
    username VARCHAR(255) PRIMARY KEY,
    password_hash VARCHAR(255),
    roles    VARCHAR(255)
);
