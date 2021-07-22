import inquirer from 'inquirer';
import { Commands } from '../utils/Commands.js';

export default class Books{
  public async search() {
    const answers = await inquirer.prompt({
      message: '📖 Search a book by 📖',
      type: 'list',
      name: 'command',
      choices: Object.values(Commands)
    });
    switch (answers['command']) {
      case Commands.Title:
    }
  }
}
