var Path = 'src/Modules'

module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'Select the type of component',
        default: 'Component',
        choices: () => ['Component', 'ComponentForm', 'ComponentTable', 'ComponentTableModal'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your foldel init name?',
      },
      {
        type: 'directory',
        name: 'path',
        message: 'What is your path?',
        validate: value => {
          Path = value
          return true
        },
      },
    ],
    actions: data => {
      let componentTemplate
      switch (data.type) {
        case 'ComponentForm': {
          componentTemplate = 'plop-templates/ComponentForm.js.hbs'
          break
        }
        default: {
          componentTemplate = 'plop-templates/Component.js.hbs'
        }
      }
      const actions = [
        {
          type: 'add',
          path: Path + '/{{pascalCase name}}/{{pascalCase name}}.tsx',
          templateFile: componentTemplate,
        },
        {
          type: 'add',
          path: Path + '/{{pascalCase name}}/{{pascalCase name}}.scss',
          templateFile: 'plop-templates/Component.scss.hbs',
        },
        {
          type: 'add',
          path: Path + '/{{pascalCase name}}/{{pascalCase name}}.Interface.tsx',
          templateFile: 'plop-templates/Component.interface.js.hbs',
        },
        {
          type: 'add',
          path: Path + '/{{pascalCase name}}/{{pascalCase name}}.Service.tsx',
          templateFile: 'plop-templates/Component.service.js.hbs',
        },
      ]
      return actions
    },
  })
}
