module.exports = {
  // 提交类型
  types: [
    { value: 'feat', name: '⚡ feat: 新功能' },
    { value: 'fix', name: '  fix: 修复Bug' },
    { value: 'docs', name: '✏️ docs: 文档变更' },
    { value: 'style', name: '  style: 不影响代码含义的变化(空白、格式化、缺少分号等)' },
    { value: 'refactor', name: '♻️ refactor: 重构代码，既不修复错误也不添加功能' },
    { value: 'perf', name: '⚡ perf: 性能优化' },
    { value: 'test', name: '✅ test: 测试相关' },
    { value: 'ci', name: '  ci: 更改持续集成文件和脚本' },
    { value: 'chore', name: '  chore: 重新打包或更新依赖工具等杂活' },
    { value: 'revert', name: '⏪ revert: 代码回退' },
    { value: 'WIP', name: '  WIP: Work in progress' }
  ],
  // 影响范围
  scopes: [
    ['components', '组件相关'],
    ['hooks', 'hook 相关'],
    ['utils', 'utils 相关'],
    ['element-ui', '对 element-ui 的调整'],
    ['styles', '样式相关'],
    ['deps', '项目依赖'],
    ['config', '配置相关'],
    ['other', '其他修改'],
    // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
    ['custom', '以上都不是？我要自定义']
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`
    }
  }),
  // 汉化
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择修改涉及范围 (可选):',
    // used if allowCustomScopes is true
    // customScope: '请输入本次改动的范围（如：功能、模块等）:',
    subject: '简短说明:\n',
    body: '详细说明，使用"|"分隔开可以换行(可选)：\n',
    breaking: '非兼容性，破坏性变化说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?'
  }
}
