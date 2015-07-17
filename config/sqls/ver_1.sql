CREATE TABLE `todo`(
  id INT(10) AUTO_INCREMENT,
  title VARCHAR(50),
  content VARCHAR(225),
  createdate DATETIME,
  flag INT DEFAULT 1,
  PRIMARY KEY(id)
)
