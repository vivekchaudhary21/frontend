import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-container">
      <style>
        {`
          .home-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #3b82f6, #9333ea, #14b8a6, #4f46e5);
            background-size: 200% 200%;
            animation: gradientAnimation 15s ease infinite;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            position: relative;
            overflow: hidden;
          }

          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.1);
            z-index: 1;
          }

          .content {
            background: white;
            border-radius: 1rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
            padding: 2rem;
            max-width: 90%;
            width: 100%;
            max-width: 32rem;
            text-align: center;
            position: relative;
            z-index: 2;
            transition: box-shadow 0.3s ease;
          }

          .content:hover {
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
          }

          .title {
            font-size: 2.5rem;
            color: #1f2937;
            font-weight: 800;
            letter-spacing: -0.025em;
            background: linear-gradient(to right, #2563eb, #9333ea);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 1.5rem;
          }

          .description {
            font-size: 1.125rem;
            color: #4b5563;
            line-height: 1.75;
            max-width: 28rem;
            margin: 0 auto 2rem;
          }

          .button-container {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            width: 100%;
          }

          .button {
            padding: 0.75rem 2rem;
            border-radius: 9999px;
            font-size: 1.125rem;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s ease;
            cursor: pointer;
            width: 100%;
            max-width: 16rem;
            margin: 0 auto;
          }

          .create-button {
            background: linear-gradient(to right, #3b82f6, #1d4ed8);
            color: white;
            border: none;
          }

          .create-button:hover {
            background: linear-gradient(to right, #2563eb, #1e40af);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .create-button:active {
            transform: translateY(0);
          }

          .join-button {
            background: transparent;
            color: #15803d;
            border: 2px solid #15803d;
          }

          .join-button:hover {
            background: #f0fdf4;
            border-color: #16a34a;
            color: #16a34a;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .join-button:active {
            transform: translateY(0);
          }

          @media (min-width: 768px) {
            .content {
              padding: 3rem;
              max-width: 40rem;
            }

            .title {
              font-size: 3.75rem;
            }

            .description {
              font-size: 1.25rem;
            }

            .button {
              max-width: 20rem;
            }
          }
        `}
      </style>
      <div className="overlay" />
      <div className="content">
        <h1 className="title">Quiz Game</h1>
        <p className="description">
          Dive into the ultimate Quiz Game experience! Create your own quiz or
          join an existing one to challenge your knowledge and compete with
          friends.
        </p>
        <div className="button-container">
          <Link to="/create" className="button create-button">
            Create a Game
          </Link>
          <Link to="/join" className="button join-button">
            Join a Game
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
