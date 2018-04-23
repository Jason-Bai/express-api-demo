# 修改imonline type 为 status

```
ALTER TABLE `imonline` CHANGE `type` `status` enum('predicted','predicting') NOT NULL DEFAULT 'predicted';
```

# 去掉predictably
```
ALTER TABLE `imonline` DROP `predictably`;
```

# 去掉status
```
ALTER TABLE `imonline` DROP `status`;
```

# 加上number
```
ALTER TABLE `imonline` ADD COLUMN `number` varchar(12) NOT NULL AFTER `id`;
```
