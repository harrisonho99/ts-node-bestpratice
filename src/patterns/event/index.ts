import { MEventEmitter } from './MEventEmitter.class';
import Log from '../../tools/log';

function entry() {
  const notify = new MEventEmitter();
  const ADD_USER = 'ADD_USER';

  notify.on(ADD_USER, (data: any) => {
    Log.green('recive from Event: ', JSON.stringify({ data }));
  });

  notify.emit(ADD_USER, 'user x ');
}

export { entry };
