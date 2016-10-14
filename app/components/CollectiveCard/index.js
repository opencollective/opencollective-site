import React, { Component, PropTypes } from 'react';

import formatCurrency from '../../lib/format_currency';
import { resizeImage } from '../../lib/utils';

const DEFAULT_BG = '/static/images/collectives/default-header-bg.jpg';
const DEFAULT_LOGOS = [
  '/static/images/code.svg',
  '/static/images/rocket.svg',
  '/static/images/repo.svg',
];

import styles from './styles.css';

export default class CollectiveCard extends Component {

  mapCollectiveCardProps() {
    const {
      contributorsCount,
      membersCount,
      backersAndSponsorsCount,
      yearlyIncome,
      currency,
      i18n,
    } = this.props;

    const stats = [];
    if (contributorsCount) {
      stats.push({ label: i18n.getString('coreContributors'), value: contributorsCount });
    } else if (membersCount) {
      stats.push({ label: i18n.getString('members'), value: membersCount });
    }

    if (backersAndSponsorsCount) {
      stats.push({ label: i18n.getString('backers'), value: backersAndSponsorsCount });
    }

    stats.push({ label: i18n.getString('annualIncome'), value: formatCurrency(yearlyIncome / 100, currency, { compact: true, precision: 0 }) });
    return stats;
  }

  mapCollectiveCardOnProfileProps() {
    const { backersCount, sponsorsCount, yearlyIncome, currency, i18n } = this.props;
    const stats = [];
    stats.push({ label: i18n.getString('backers'), value: backersCount });
    stats.push({ label: i18n.getString('sponsors'), value: sponsorsCount });
    stats.push({ label: i18n.getString('annualIncome'), value: formatCurrency(yearlyIncome / 100, currency, { compact: true, precision: 0 }) });
    return stats;
  }

  mapSponsorsCardProps() {
    const { collectives, totalDonations, currency } = this.props;

    const stats = [
      {
        label: ' ',
        value: ' ',
      }, {
        label: 'collectives',
        value: collectives,
      }, {
        label: 'donations',
        value: formatCurrency(totalDonations, currency, { compact: true, precision: 0 }),
      }];
    return stats;
  }

  render() {
    const {
      id,
      backgroundImage,
      logo,
      name,
      description,
      mission,
      publicUrl,
      i18n,
      isSponsor,
      isCollectiveOnProfile,
    } = this.props;

    let stats = [];

    if (isSponsor) {
      stats = this.mapSponsorsCardProps();
    } else if (isCollectiveOnProfile) {
      stats = this.mapCollectiveCardOnProfileProps();
    } else {
      stats = this.mapCollectiveCardProps();
    }

    return (
      <div key={id} className={styles.CollectiveCard}>
        <a href={publicUrl}>
          <div>
            <div className={styles.head}>
              <div className={styles.background} style={{ backgroundImage: `url(${resizeImage(backgroundImage, 320) || DEFAULT_BG})` }}>
                <div className={styles.image} style={{ backgroundImage: `url(${logo || DEFAULT_LOGOS[id % DEFAULT_LOGOS.length]})` }}></div>
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.name}>{name}</div>
              <div className={styles.description}>{i18n.getString('missionTo')} {mission || description}</div>
            </div>
            <div className={styles.footer}>
              <div>
              { stats.map((stat) =>
                <div>
                  <div className={styles.metric}>
                    <div className={styles.value}>{stat.value}</div>
                    <div className={styles.label}>{stat.label}</div>
                  </div>
                </div>
              ) }
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }

}

CollectiveCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  logo: PropTypes.string,
  publicUrl: PropTypes.string,
  contributorsCount: PropTypes.number,
  membersCount: PropTypes.number,
  backersCount: PropTypes.number,
  sponsorsCount: PropTypes.number,
  backersAndSponsorsCount: PropTypes.number,
  yearlyIncome: PropTypes.number,
  currency: PropTypes.string,
  i18n: PropTypes.object.isRequired,
  isSponsor: PropTypes.bool,
  isCollectiveOnProfile: PropTypes.bool,
  backgroundImage: PropTypes.string,
  mission: PropTypes.string,
  collectives: PropTypes.string,
  totalDonations: PropTypes.number,
  id: PropTypes.number,
};

CollectiveCard.defaultProps = {
  name: '',
  description: '',
  logo: '',
  publicUrl: '',
  contributorsCount: 0,
  membersCount: 0,
  backersCount: 0,
  sponsorsCount: 0,
  backersAndSponsorsCount: 0,
  yearlyIncome: 0,
  currency: '',
  i18n: { getString: (str) => str },
  isSponsor: false,
  isCollectiveOnProfile: false,
  backgroundImage: '',
  mission: '',
  collectives: '',
  totalDonations: 0,
  id: 0,
};
