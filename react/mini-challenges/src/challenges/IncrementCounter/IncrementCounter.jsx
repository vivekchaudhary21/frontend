import React, { useEffect, useState } from 'react'
import styles from './incrementcounter.module.css'

export const IncrementCounter = () => {
  const [social, setSocial] = useState({
    twitterFollowers: 0,
    youTubeSubscribers: 0,
    facebookFans: 0,
  })

  useEffect(() => {
    if (social.twitterFollowers < 12000) {
      setSocial((pv) => ({
        ...pv,
        twitterFollowers: pv.twitterFollowers + 1,
      }))
    }
  }, [social.twitterFollowers])

  useEffect(() => {
    if (social.youTubeSubscribers < 5000) {
      setSocial((pv) => ({
        ...pv,
        youTubeSubscribers: pv.youTubeSubscribers + 1,
      }))
    }
  }, [social.youTubeSubscribers])

  useEffect(() => {
    if (social.facebookFans < 7500) {
      setSocial((pv) => ({
        ...pv,
        facebookFans: pv.facebookFans + 1,
      }))
    }
  }, [social.facebookFans])

  useEffect(() => {
    setSocial((pv) => ({
      twitterFollowers: pv.twitterFollowers++,
      youTubeSubscribers: pv.youTubeSubscribers++,
      facebookFans: pv.facebookFans++,
    }))
  }, [])
  return (
    <div className="main-container">
      <div className={styles.counterContainer}>
        <i className="fab fa-twitter fa-3x"></i>
        <div className={styles.counter} data-target="12000">
          {social.twitterFollowers}
        </div>
        <span>Twitter Followers</span>
      </div>

      <div className={styles.counterContainer}>
        <i className="fab fa-youtube fa-3x"></i>
        <div className={styles.counter} data-target="5000">
          {social.youTubeSubscribers}
        </div>
        <span>YouTube Subscribers</span>
      </div>

      <div className={styles.counterContainer}>
        <i className="fab fa-facebook fa-3x"></i>
        <div className={styles.counter} data-target="7500">
          {social.facebookFans}
        </div>
        <span>Facebook Fans</span>
      </div>
    </div>
  )
}
