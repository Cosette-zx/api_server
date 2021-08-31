// 全局配置文件
// 向外共享 加密 和 还原 Token 的 jwtSecretKey 字符串
module.exports = {
  // 加密解密token的密钥，自定义的
  jwtSecretKey: "Cosette Fighting.",
  // token有效期
  expiresIn: "10h",
};
