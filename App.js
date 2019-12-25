import React, { Component } from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  AdMobRewarded,
  PublisherBanner,
} from 'react-native-admob';

const BannerExample = ({ style, title, children, ...props }) => (
    <View {...props} style={[styles.example, style]}>
      <Text style={styles.title}>{title}</Text>
      <View>{children}</View>
    </View>
);

const bannerWidths = [200, 250, 320];

export default class Example extends Component {
  constructor() {
    super();
    this.state = {
      fluidSizeIndex: 0,
    };
  }

  componentDidMount() {
    AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
    AdMobRewarded.setAdUnitID('ca-app-pub-6751834114715010/8810511087');

    AdMobRewarded.addEventListener('rewarded', reward =>
        console.log('AdMobRewarded => rewarded', reward),
    );
    AdMobRewarded.addEventListener('adLoaded', () =>
        console.log('AdMobRewarded => adLoaded'),
    );
    AdMobRewarded.addEventListener('adFailedToLoad', error =>
        console.log(error),
    );
    AdMobRewarded.addEventListener('adOpened', () =>
        console.log('AdMobRewarded => adOpened'),
    );
    AdMobRewarded.addEventListener('videoStarted', () =>
        console.log('AdMobRewarded => videoStarted'),
    );
    AdMobRewarded.addEventListener('adClosed', () => {
      console.log('AdMobRewarded => adClosed');
      AdMobRewarded.requestAd().catch(error => console.log(error));
    });
    AdMobRewarded.addEventListener('adLeftApplication', () =>
        console.log('AdMobRewarded => adLeftApplication'),
    );

    AdMobRewarded.requestAd().catch(error => console.log(error));

    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.setAdUnitID('ca-app-pub-6751834114715010/8810511087');

    AdMobInterstitial.addEventListener('adLoaded', () =>
        console.log('AdMobInterstitial adLoaded'),
    );
    AdMobInterstitial.addEventListener('adFailedToLoad', error =>
        console.log(error),
    );
    AdMobInterstitial.addEventListener('adOpened', () =>
        console.log('AdMobInterstitial => adOpened'),
    );
    AdMobInterstitial.addEventListener('adClosed', () => {
      console.log('AdMobInterstitial => adClosed');
      AdMobInterstitial.requestAd().catch(error => console.log(error));
    });
    AdMobInterstitial.addEventListener('adLeftApplication', () =>
        console.log('AdMobInterstitial => adLeftApplication'),
    );

    AdMobInterstitial.requestAd().catch(error => console.log(error));
  }

  componentWillUnmount() {
    AdMobRewarded.removeAllListeners();
    AdMobInterstitial.removeAllListeners();
  }

  showRewarded() {
    AdMobRewarded.showAd().catch(error => console.log(error));
  }

  showInterstitial() {
    AdMobInterstitial.showAd().catch(error => console.log(error));
  }

  render() {
    return (
        <View style={styles.container}>
          <ScrollView>
            <BannerExample title="AdMob - Basic">
              <AdMobBanner
                  adSize="banner"
                  adUnitID="ca-app-pub-6751834114715010/8810511087"
                  ref={el => (this._basicExample = el)}
              />
              <Button
                  title="Reload"
                  onPress={() => this._basicExample.loadBanner()}
              />
            </BannerExample>
            <BannerExample title="Smart Banner">
              <AdMobBanner
                  adSize="smartBannerPortrait"
                  adUnitID="ca-app-pub-6751834114715010/8810511087"
                  ref={el => (this._smartBannerExample = el)}
              />
              <Button
                  title="Reload"
                  onPress={() => this._smartBannerExample.loadBanner()}
              />
            </BannerExample>
            <BannerExample title="Rewarded">
              <Button
                  title="Show Rewarded Video and preload next"
                  onPress={this.showRewarded}
              />
            </BannerExample>
            <BannerExample title="Interstitial">
              <Button
                  title="Show Interstitial and preload next"
                  onPress={this.showInterstitial}
              />
            </BannerExample>
            <BannerExample title="DFP - Multiple Ad Sizes">
              <PublisherBanner
                  adSize="banner"
                  validAdSizes={['banner', 'largeBanner', 'mediumRectangle']}
                  adUnitID="/6499/example/APIDemo/AdSizes"
                  ref={el => (this._adSizesExample = el)}
              />
              <Button
                  title="Reload"
                  onPress={() => this._adSizesExample.loadBanner()}
              />
            </BannerExample>
            <BannerExample
                title="DFP - App Events"
                style={this.state.appEventsExampleStyle}>
              <PublisherBanner
                  style={{ height: 50 }}
                  adUnitID="/6499/example/APIDemo/AppEvents"
                  onAdFailedToLoad={error => {
                    console.log(error);
                  }}
                  onAppEvent={event => {
                    if (event.name === 'color') {
                      this.setState({
                        appEventsExampleStyle: { backgroundColor: event.info },
                      });
                    }
                  }}
                  ref={el => (this._appEventsExample = el)}
              />
              <Button
                  title="Reload"
                  onPress={() => this._appEventsExample.loadBanner()}
                  style={styles.button}
              />
            </BannerExample>
            <BannerExample title="DFP - Fluid Ad Size">
              <View
                  style={[
                    { backgroundColor: '#f3f', paddingVertical: 10 },
                    this.state.fluidAdSizeExampleStyle,
                  ]}>
                <PublisherBanner
                    adSize="fluid"
                    adUnitID="/6499/example/APIDemo/Fluid"
                    ref={el => (this._appFluidAdSizeExample = el)}
                    style={{ flex: 1 }}
                />
              </View>
              <Button
                  title="Change Banner Width"
                  onPress={() =>
                      this.setState(prevState => ({
                        fluidSizeIndex: prevState.fluidSizeIndex + 1,
                        fluidAdSizeExampleStyle: {
                          width:
                              bannerWidths[
                              prevState.fluidSizeIndex % bannerWidths.length
                                  ],
                        },
                      }))
                  }
                  style={styles.button}
              />
              <Button
                  title="Reload"
                  onPress={() => this._appFluidAdSizeExample.loadBanner()}
                  style={styles.button}
              />
            </BannerExample>
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 30 : 10,
  },
  example: {
    paddingVertical: 10,
  },
  title: {
    margin: 10,
    fontSize: 20,
  },
});
