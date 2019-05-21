import { Oauth } from '../oauth';
import {SafariViewController} from '@ionic-native/safari-view-controller'
declare var window: any;

function ensureEnvIsValid() {
  if (!window.cordova) {
      throw new Error('Cannot authenticate via a web browser');
  }
}
function openUrl(URL: string)
{
  SafariViewController.isAvailable()
      .then((available: boolean) => {
        if (available) {
          this.safariViewController.show({
            url: URL,
            hidden: false,
            animated: false,
            transition: 'curl',
            enterReaderModeIfAvailable: false,
            tintColor: '#ff0000'
          })
            .subscribe((result: any) => {
              if (result.event === 'opened') {
                console.log('Opened');
              } else if (result.event === 'loaded') {
                console.log('Loaded');
              } else if (result.event === 'closed') {
                console.log('Closed');
              }
            },
              (error: any) => console.error(error)
            );

        } else {
          // use fallback browser, example InAppBrowser
        }
      }
      );
}
export class OauthCordova extends Oauth {
  defaultWindowOptions = {
      location: 'no',
      clearsessioncache: 'yes',
      clearcache: 'yes'
  };
  protected openDialog(url: string, windowParams: Object, options: any = {}) {
    const params = this.serializeOptions(windowParams);
    return new Promise((resolve, reject) => {
        openUrl(url);
    })
  }
}
