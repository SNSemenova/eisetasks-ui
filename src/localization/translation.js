const translation = {
  en: {
    components: {
      addTask: {
        AddTaskTopic: 'Add a new task',
        fieldPlaceholder: ' ',
        cancel: 'cancel',
        submit: 'ok',
        EditTaskTopic: 'Edit the task'
      },
      filters: {
        important: 'Important',
        urgent: 'Urgent',
        clear: 'Clear',
        complete: 'Complete'
      },
      form: {
        add_task: 'Add new task',
        email: 'Email',
        password: 'Password',
        forgot: 'Forgot password?',
        error: {
          wrong: {
            first: 'Oops!',
            second: 'Someting goes wrong',
            third: 'with password',
            fourth: 'or e-mail...'
          },
          not_email: {
            first: 'Hey! It doesn’t look',
            second: 'like an e-mail!'
          },
          long: {
            first: 'Wow!',
            second: 'Enter less than',
            third: '100 characters.'
          },
          short: {
            first: 'Too small!',
            second: 'Enter more than',
            third: '8 characters.'
          }
        },
        question: {
          forgot: 'Forgot password?',
          tell: 'Just tell us your email.'
        },
        changePassword: 'Change password',
        submit: {
          login: 'Log in',
          signup: 'Sign up',
          setNew: 'Set new password',
          help: 'Help me'
        },
        newPassword: 'New password'
      }
    },
    layout: {
      menu: {
        todayTasks: 'To do',
        inboxTasks: 'Inbox',
        postponedTasks: 'Postponed',
        doneTasks: 'Done'
      }
    },
    pages: {
      message: {
        today: {
          first: 'You do not have any tasks for Today. ',
          second: 'You can add tasks or move them ',
          third: 'from the "Postponed" list. '
        },
        inbox: {
          first: 'You do not have any tasks in Inbox.',
          second: 'You can add tasks.'
        },
        postponed: {
          first: 'You do not have any postponed tasks.',
          second: 'You can add tasks or move them ',
          third: 'from the "Today" task list.'
        },
        done: {
          first: 'You do not have any Done tasks yet.',
          second: 'You should do tasks in the "Today',
          third: 'or "Postponed" task lists. '
        },
        server: 'The server is asleep.',
        no_tasks: 'There is no tasks'
      },
      signin: {
        question: 'Don’t have an account?',
        link: 'Sign up'
      },
      signup: {
        question: 'Already have an account?',
        link: 'Log in'
      },
      error: {
        error_messages: {
          404: 'Page is not found',
          500: 'Internal server error',
          502: 'Server is not available'
        },
        monkey_messages: {
          404: 'I think there is no pages with this address',
          500: 'There are some serious problems, I think :(',
          502: 'Now we have some problems. Come later, please :('
        },
        something_interesting: {
          404: 'Hey! There\'s only one button to click!',
          500: 'Our developers are stupid, sorry :(',
          502: 'Ha-ha! Server is dead :D'
        },
      }
    }
  },
  ru: {
    components: {
      addTask: {
        addButton: '',
        fieldPlaceholder: ''
      }
    },
    layout: {
      menu: {
        todayTasks: 'Сегодня',
        inboxTasks: 'Inbox',
        postponedTasks: 'Postponed',
        doneTasks: 'Выполнено'
      }
    }
  }
};
export default translation;