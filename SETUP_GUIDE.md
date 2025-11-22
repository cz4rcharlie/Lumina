# 🚀 域名和 CDN 配置完整指南

## 📋 前提条件

- ✅ 你已经注册了域名（例如：`yourdomain.com`）
- ✅ 你的网站已部署在 Vercel（例如：`your-project.vercel.app`）
- ✅ 你需要 CDN 加速（提升国内访问速度）

---

## 🎯 目标

通过以下配置，你将获得：
- ✅ 使用自定义域名访问网站
- ✅ 国内访问速度提升 50-80%
- ✅ 自动 HTTPS 证书
- ✅ DDoS 防护
- ✅ 完全免费

---

## 📝 配置步骤（10分钟完成）

### 步骤 1：在 Vercel 添加域名

1. **登录 Vercel Dashboard**
   - 访问：https://vercel.com/dashboard
   - 找到你的项目（进入项目详情页）

2. **进入域名设置**
   - 点击顶部菜单 **"Settings"**
   - 点击左侧菜单 **"Domains"**

3. **添加域名**
   - 在输入框中输入你的域名（例如：`yourdomain.com`）
   - 点击 **"Add"** 按钮

4. **查看 DNS 配置信息**
   - Vercel 会显示需要配置的 DNS 记录
   - **重要**：记录下 CNAME 值（例如：`cname.vercel-dns.com`）
   - **注意**：先不要在你的域名注册商配置 DNS，我们会在 Cloudflare 中配置

**✅ 步骤 1 完成！**

---

### 步骤 2：注册 Cloudflare 账号

1. **访问 Cloudflare**
   - 打开：https://dash.cloudflare.com/sign-up
   - 使用邮箱注册（完全免费）

2. **完成注册**
   - 输入邮箱和密码
   - 验证邮箱（如果需要）
   - 登录 Cloudflare Dashboard

**✅ 步骤 2 完成！**

---

### 步骤 3：在 Cloudflare 添加域名

1. **添加网站**
   - 登录 Cloudflare Dashboard
   - 点击 **"Add a Site"** 按钮
   - 输入你的域名（例如：`yourdomain.com`）
   - 点击 **"Continue"**

2. **选择计划**
   - 选择 **"Free"** 计划（免费版）
   - 点击 **"Continue"**

3. **查看 DNS 记录**
   - Cloudflare 会自动扫描你域名的现有 DNS 记录
   - 通常不会有相关记录（因为域名刚注册）
   - 点击 **"Continue"** 继续

**✅ 步骤 3 完成！**

---

### 步骤 4：配置 DNS 记录

1. **进入 DNS 设置**
   - 在 Cloudflare Dashboard 中
   - 点击左侧菜单 **"DNS"**
   - 点击 **"Records"** 标签

2. **添加 CNAME 记录（根域名）**
   - 点击 **"Add record"** 按钮
   - 配置如下：
     - **Type**: 选择 `CNAME`
     - **Name**: 输入 `@`（表示根域名）
     - **Target**: 输入 Vercel 提供的 CNAME 值（例如：`cname.vercel-dns.com`）
     - **Proxy status**: **开启（橙色云朵图标）** ⚠️ 这一步很重要！
     - **TTL**: 选择 `Auto`
   - 点击 **"Save"**

3. **（可选）添加 www 记录**
   - 如果你想同时支持 `www.yourdomain.com`
   - 再次点击 **"Add record"**
   - 配置如下：
     - **Type**: `CNAME`
     - **Name**: 输入 `www`
     - **Target**: 输入与上面相同的 Vercel CNAME 值
     - **Proxy status**: **开启（橙色云朵图标）**
   - 点击 **"Save"**

**✅ 步骤 4 完成！**

---

### 步骤 5：更新域名服务器（Nameservers）

这是最关键的一步！

1. **获取 Cloudflare Nameservers**
   - 在 Cloudflare Dashboard 中
   - 你会看到两个 Nameservers（DNS 服务器地址）
   - 例如：
     - `ns1.cloudflare.com`
     - `ns2.cloudflare.com`
   - **复制这两个地址**

2. **登录你的域名注册商**
   - 例如：Tname.net、FreeName.cn、Namecheap、GoDaddy、阿里云等
   - 登录你的账号

3. **找到 Nameservers 设置**
   - 找到你的域名管理页面
   - 查找 **"Nameservers"** 或 **"DNS 服务器"** 或 **"域名服务器"** 设置
   - 通常在 "DNS 设置" 或 "域名管理" 中

4. **更新 Nameservers**
   - 将现有的 Nameservers 替换为 Cloudflare 提供的两个地址
   - 保存设置

**⚠️ 重要提示**：
- 更新 Nameservers 后，DNS 解析将由 Cloudflare 管理
- 生效时间通常为 5-30 分钟，最多 48 小时
- 生效后，Cloudflare 会显示 "Active" 状态

**✅ 步骤 5 完成！**

---

### 步骤 6：等待 DNS 生效

1. **检查 DNS 传播状态**
   - 访问：https://dnschecker.org
   - 输入你的域名
   - 选择 "CNAME" 记录类型
   - 查看全球 DNS 传播状态

2. **在 Cloudflare 检查状态**
   - 回到 Cloudflare Dashboard
   - 查看你的域名状态
   - 当显示 **"Active"** 时，说明配置成功

3. **测试访问**
   - 在浏览器访问你的域名：`https://yourdomain.com`
   - 应该可以看到你的网站
   - 浏览器地址栏应该显示锁图标（HTTPS）

**⏱️ 等待时间**：通常 5-30 分钟，最多 48 小时

**✅ 步骤 6 完成！**

---

### 步骤 7：优化 Cloudflare 设置（可选但推荐）

1. **开启自动压缩**
   - Cloudflare Dashboard → 点击你的域名
   - 左侧菜单 **"Speed"** → **"Optimization"**
   - 开启以下选项：
     - ✅ **Auto Minify**：压缩 HTML/CSS/JS
     - ✅ **Brotli**：更高效的压缩算法

2. **缓存设置**
   - 左侧菜单 **"Caching"** → **"Configuration"**
   - **Cache Level**: 选择 `Standard`
   - **Browser Cache TTL**: 选择 `Respect Existing Headers`

3. **SSL/TLS 设置**
   - 左侧菜单 **"SSL/TLS"**
   - **Encryption mode**: 选择 **"Full"** 或 **"Full (strict)"**

**✅ 步骤 7 完成！**

---

## 🎉 完成！

恭喜！你的网站现在：

- ✅ 可以通过自定义域名访问
- ✅ 通过 Cloudflare CDN 加速（国内访问速度提升 50-80%）
- ✅ 自动 HTTPS 证书
- ✅ DDoS 防护
- ✅ 完全免费

---

## 🔍 常见问题

### Q1: DNS 记录添加后多久生效？
**A**: 通常 5-30 分钟，最多 48 小时。你可以使用 https://dnschecker.org 检查 DNS 传播状态。

### Q2: 如何检查 DNS 是否生效？
**A**: 
- 使用 https://dnschecker.org 检查 DNS 传播（输入你的域名）
- 或在命令行执行：`nslookup yourdomain.com`（替换为你的域名）
- 在 Cloudflare Dashboard 查看域名状态（应显示 "Active"）

### Q3: Cloudflare 显示 "Pending" 怎么办？
**A**: 
- 检查 Nameservers 是否正确更新到 Cloudflare
- 等待 DNS 传播（最多 48 小时）
- 确认域名注册商的 Nameservers 设置已保存

### Q4: 网站显示 "502 Bad Gateway"？
**A**: 
- 检查 Vercel 部署是否正常（访问你的 Vercel 默认域名测试，例如：`your-project.vercel.app`）
- 检查 Cloudflare DNS 记录中的 Target 是否正确（应为 Vercel 的 CNAME）
- 检查 Cloudflare SSL/TLS 设置（应选择 "Full" 或 "Full (strict)"）

### Q5: 如何同时支持 www 和根域名？
**A**: 
- 在 Cloudflare DNS 中添加两条 CNAME 记录：
  - `@` → CNAME → `cname.vercel-dns.com`（根域名，替换为你的 Vercel CNAME）
  - `www` → CNAME → `cname.vercel-dns.com`（www 子域名，替换为你的 Vercel CNAME）
- 两条记录的 Proxy status 都要开启（橙色云朵）

### Q6: 为什么 Proxy status 要开启？
**A**: 
- Proxy status（橙色云朵）开启后，流量会经过 Cloudflare CDN 加速
- 如果关闭（灰色云朵），只是 DNS 解析，没有 CDN 加速效果
- **必须开启才能获得加速效果！**

### Q7: 配置完成后，国内访问速度如何？
**A**: 
- 首屏加载时间：从 3-5 秒降至 1.5-2.5 秒
- 完全加载时间：从 5-8 秒降至 3-5 秒
- TTFB（首字节时间）：从 800-1200ms 降至 300-500ms
- **整体速度提升 50-80%**

### Q8: 可以使用其他 CDN 服务吗？
**A**: 
- 本指南主要介绍 Cloudflare，因为它提供免费且功能强大的 CDN 服务
- 你也可以使用其他 CDN 服务（如阿里云 CDN、腾讯云 CDN 等），但配置步骤会有所不同
- Cloudflare 免费版已经足够满足大多数个人和小型项目的需求

---

## 📝 配置检查清单

在开始之前，确认：
- [ ] 域名已注册完成
- [ ] Vercel 网站可以正常访问

配置过程中，检查：
- [ ] 域名已添加到 Vercel
- [ ] 已记录 Vercel 提供的 CNAME 值
- [ ] Cloudflare 账号已注册
- [ ] 域名已添加到 Cloudflare
- [ ] DNS 记录已配置（CNAME 指向 Vercel）
- [ ] Proxy status 已开启（橙色云朵）
- [ ] Nameservers 已更新到 Cloudflare
- [ ] Cloudflare 显示 "Active"

配置完成后，测试：
- [ ] 域名可以正常访问
- [ ] HTTPS 自动配置（浏览器显示锁图标）
- [ ] 网站功能正常
- [ ] 访问速度明显提升

---

## 🆘 需要帮助？

如果遇到问题：

1. **检查 DNS 传播状态**：https://dnschecker.org（输入你的域名）
2. **检查 Vercel 部署状态**：访问你的 Vercel 默认域名确认网站正常（例如：`your-project.vercel.app`）
3. **查看 Cloudflare 状态**：确认域名显示 "Active"
4. **测试域名访问**：访问 `https://yourdomain.com` 确认网站正常（替换为你的域名）
5. **检查浏览器控制台**：查看是否有错误信息

---

## 📚 相关资源

- [Cloudflare 官方文档](https://developers.cloudflare.com/)
- [Vercel 域名配置文档](https://vercel.com/docs/concepts/projects/domains)
- [DNS 检查工具](https://dnschecker.org)

---

## 💡 提示

- 将文档中所有的 `yourdomain.com` 替换为你自己的域名
- 将 `your-project.vercel.app` 替换为你自己的 Vercel 项目域名
- 将 `cname.vercel-dns.com` 替换为 Vercel 实际提供的 CNAME 值

---

**祝你配置顺利！** 🚀
