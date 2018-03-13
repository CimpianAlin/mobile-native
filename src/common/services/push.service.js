import {
  Platform,
} from 'react-native';
import { platform } from 'os';

import Router from './push/router';

/**
 * Push Service
 */
class PushService {
  push;
  router;

  /**
   * Constructor
   */
  constructor() {
    // build platform instance
    const platform = (Platform.OS == 'ios') ? require('./push/ios-platform').default : require('./push/android-platform').default;
    this.push = new platform();

    this.router = new Router();

    this.push.setOnNotificationOpened((notification) => {
      // get notification data
      const data = notification.getData();
      if (data.json) data.json = JSON.parse(data.json);
      // navigate
      this.router.navigate(data);

    })
  }

  /**
   * Init
   */
  init() {
    this.push.init();
  }

  /**
   * Stop listen for push notification
   */
  stop() {
    this.push.stop();
  }

  /**
   * Register push service token
   */
  registerToken() {
    this.push.registerToken();
  }

  /**
   * Set app badge
   * @param {integer} num 
   */
  setBadgeCount(num) {
    this.push.setBadgeCount(num);
  }
}

export default new PushService();