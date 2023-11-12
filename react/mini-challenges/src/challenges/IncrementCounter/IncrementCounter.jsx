import React, { useEffect, useRef, useState } from 'react'
import styles from './incrementcounter.module.css'

export const IncrementCounter = () => {
  const [social, setSocial] = useState({
    twitterFollowers: 0,
    youTubeSubscribers: 0,
    facebookFans: 0,
  })

  const socialRef = {
    twitterRef: useRef(),
    youTubeRef: useRef(),
    facebookRef: useRef(),
  }

  useEffect(() => {
    const totalTwitterFollowers = socialRef.twitterRef.current.dataset.target
    const totalYouTubeSubscribers = socialRef.youTubeRef.current.dataset.target
    const totalFacebookFans = socialRef.facebookRef.current.dataset.target

    const shouldUpdateTwitterFollowers =
      social.twitterFollowers < totalTwitterFollowers
    const shouldUpdateYoutubeSubscribers =
      social.youTubeSubscribers < totalYouTubeSubscribers
    const shouldUpdateFacebookFans = social.facebookFans < totalFacebookFans

    setSocial((pv) => ({
      twitterFollowers: shouldUpdateTwitterFollowers
        ? pv.twitterFollowers + 1
        : pv.twitterFollowers,
      youTubeSubscribers: shouldUpdateYoutubeSubscribers
        ? pv.youTubeSubscribers + 1
        : pv.youTubeSubscribers,
      facebookFans: shouldUpdateFacebookFans
        ? pv.facebookFans + 1
        : pv.facebookFans,
    }))
  }, [
    social.twitterFollowers,
    socialRef.twitterRef,
    social.youTubeSubscribers,
    socialRef.youTubeRef,
    social.facebookFans,
    socialRef.facebookRef,
  ])

  return (
    <div className="main-container">
      <div className={styles.counterContainer}>
        <i className="fab fa-twitter fa-3x"></i>
        <div
          className={styles.counter}
          data-target="12000"
          ref={socialRef.twitterRef}
        >
          {social.twitterFollowers}
        </div>
        <span>Twitter Followers</span>
      </div>

      <div className={styles.counterContainer}>
        <i className="fab fa-youtube fa-3x"></i>
        <div
          className={styles.counter}
          data-target="5000"
          ref={socialRef.youTubeRef}
        >
          {social.youTubeSubscribers}
        </div>
        <span>YouTube Subscribers</span>
      </div>

      <div className={styles.counterContainer}>
        <i className="fab fa-facebook fa-3x"></i>
        <div
          className={styles.counter}
          data-target="7500"
          ref={socialRef.facebookRef}
        >
          {social.facebookFans}
        </div>
        <span>Facebook Fans</span>
      </div>
    </div>
  )
}
