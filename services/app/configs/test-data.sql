-- user
INSERT INTO `user` (`id`, `name`, `email`, `password`, `salt`, `role`, `isDelete`, `createdAt`, `updatedAt`) VALUES (1, 'baiyu', '602316022@qq.com', '0296d58ee532f6dde7058453ff5205c1', 'YigRivsMpZYHXZis', 'admin', 'no', NOW(), NOW());
-- imonline
INSERT INTO `imonline` (`id`, `status`, `current`, `history`, `date`, `quarter`, `month`, `weekday`, `hour`, `minute`, `result`, `createdAt`, `updatedAt`)
VALUES
	(1, 'predicted', 273625519, 282877126, '2018-04-23 13:15:05', 2, 4, 1, 13, 15, '05519', '2018-04-23 13:15:05', '2018-04-23 13:15:05');

