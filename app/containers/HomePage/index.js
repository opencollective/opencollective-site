/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';

import numbro from 'numbro';
import 'numbro/dist/languages';

import { createStructuredSelector } from 'reselect';

import {
  selectCollectives,
  selectSponsors,
  selectStats,
} from './selectors';

import i18nLib from '../../lib/i18n';
import formatCurrency from '../../lib/format_currency';

// TODO: enable this
//import LoginTopBar from '../LoginTopBar';

import CollectiveCard from '../../components/CollectiveCard';
import PublicFooter from '../../components/PublicFooter';
import MailChimpInputSection from '../../components/MailChimpInputSection';

import { homepageRequest } from './actions.js';

import styles from './styles.css';

const i18n = i18nLib('en');

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      showSponsorMailInput: false,
    };
  }

  componentDidMount() {
    this.props.homepageRequest();
  }


  render() {
    const { collectives, sponsors, stats } = this.props;

    const { showSponsorMailInput } = this.state;
    const currency = 'USD';
    const opensource = collectives ? collectives.opensource : [];
    const meetup = collectives ? collectives.meetup : [];
    const sponsorList = sponsors || [];

    const totalCollectives = stats ? stats.totalCollectives : 0;
    const totalDonations = stats ? stats.totalDonations : 0;
    const totalDonors = stats ? stats.totalDonors : 0;

    return (
      <div className={`${styles.HomePage}`}>

        <section className={`${styles.HomePageHero}`}>
          <div className={`${styles.title}`}>
            <svg width='500px' height='70px' className='align-middle'>
              <use xlinkHref='#sprite_svg-logotype' fill='#303233'/>
            </svg>
          </div>
          <div className={`${styles.subtitle}`}>organizing the Internet generation</div>
          <div className={`${styles.heading}`}>We all have something to contribute.</div>
        </section>
        <section className={`${styles.HomePageInfo}`} id='howitworks'>
          <div className={`${styles.heading}`}>What is an open collective?</div>
          <div className={`${styles.subheading}`}>A group of people with a shared mission that operates in full transparency</div>
          <div className='icons-container clearfix'>
            <div className='col sm-col-6 md-col-4'>
              <div className='-graphic -tghost'>&nbsp;</div>
              <div className='-heading'>Transparent</div>
              <div className='-description'>Anyone can follow the money.</div>
            </div>
            <div className='col sm-col-6 md-col-4'>
              <div className='-graphic -oc'>&nbsp;</div>
              <div className='-heading'>Open</div>
              <div className='-description'>Anyone is welcome to join and contribute.</div>
            </div>
            <div className='col sm-col-6 md-col-4'>
              <div className='-graphic -fluid'>&nbsp;</div>
              <div className='-heading'>Fluid</div>
              <div className='-description'>Leaders can change over time.</div>
            </div>
          </div>
        </section>
        <section className={`${styles.HomePageOpenSource}  ${styles.blueGradient}`} id='opensource'>
          <div className='heading'>Collectives for <span className='color-blue'>Open Source</span> projects</div>
          <div className='subheading'>These open source projects have created open collectives to share their expenses and let their community chip in.</div>
          <div className='cards'>
            {opensource.map(group => <CollectiveCard
              key={group.id}
              i18n={i18n}
              {...group}
            />)}
            <a href='/opensource' className='seemore'>See more collectives</a>
          </div>
          <div className='cta'>
            <div className='text'>Have an open source project?</div>
            <a href='/opensource/apply'>
              <div className='button color-blue'>apply to create a collective!</div>
            </a>
          </div>
        </section>
        <section className='HomePageMeetups blue-gradient' id='meetups'>
          <div className='heading'>Collectives for <span className='color-green'>meetups</span></div>
          <div className='subheading'>Open Collective empowers local meetups to raise funds and have their own budget.</div>
          <div className='cards'>
            {meetup.map(group => <CollectiveCard
              key={group.id}
              i18n={i18n}
              {...group}
            />)}
            <a href='/discover?show=meetup' className='seemore'>See more meetups</a>
          </div>
          <div className='cta' id='apply'>
            <div className='text'>We are slowly letting in new kinds of collectives</div>
            <div className='button color-green'>join the waiting list!</div>
          </div>
        </section>
        <MailChimpInputSection mcListId='14d6233180' />
        <section className='HomePageSponsors blue-gradient' id='sponsors'>
          <div className='heading'>Sponsors</div>
          <div className='subheading'>Collectives do amazing things for their communities thanks to these awesome sponsors.</div>
          <div className='cards'>
            {sponsorList.map(sponsor => <CollectiveCard
              key={sponsor.id}
              i18n={i18n}
              publicUrl={`/${sponsor.username}`}
              isSponsor
              {...sponsor}
            />)}
          </div>
          <div className='cta'>
            <div className='text'>Become a sponsor and reach out to the right communities</div>
            <div className='button color-green' onClick={() => this.setState({showSponsorMailInput: !showSponsorMailInput})}>become a sponsor</div>
          </div>
        </section>
        {showSponsorMailInput && <MailChimpInputSection mcListId='4cbda7da19' buttonLabel='Apply' />}
        <section className='HomePageNumber'>
          <div className='heading'>Open Numbers</div>
          <div className='numbers-container'>
            <div className='clearfix'>
              <div className='col sm-col-6 md-col-4'>
                <div className='-graphic -tghost'>
                  <div className='-value'>{ numbro(totalCollectives).format('0,0') }</div>
                </div>
                <div className='-heading'>Collectives</div>
              </div>
              <div className='col sm-col-6 md-col-4'>
                <div className='-graphic -oc'>
                  <div className='-value'>{ numbro(totalDonors).format('0,0') }</div>
                </div>
                <div className='-heading'>Backers</div>
              </div>
              <div className='col sm-col-6 md-col-4'>
                <div className='-graphic -fluid'>
                  <div className='-value'>{formatCurrency(totalDonations, currency, { compact: true, precision: 0 })}</div>
                </div>
                <div className='-heading'>Funds collected</div>
              </div>
            </div>
          </div>
        </section>
        <PublicFooter />
      </div>
    )
  }
}

HomePage.propTypes = {
  homepageRequest: React.PropTypes.func,
  collectives: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  sponsors: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  stats: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  collectives: selectCollectives(),
  sponsors: selectSponsors(),
  stats: selectStats(),
});


export default connect(mapStateToProps, {
  homepageRequest,
})(HomePage);