import ContactForm from '../components/ContactForm'

function AboutPage() {
  return (
    <>
      <header className="center">
        <h1>About Us</h1>
        <p>
          We are a small team of developers who are passionate about testing. We
          have created this demo to help you learn how to use Cypress.
        </p>
        <p>
          <a href="https://youtube.com/c/academind">Click here </a>to learn more
          about Cypress.
        </p>
      </header>
      <ContactForm />
    </>
  )
}

export default AboutPage
