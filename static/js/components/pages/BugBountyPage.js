import { Link } from "react-router-dom"

export const BugBountyPage = () => {
  return (
    <>
      <div className={"text-center d-flex main-header h-100vh-desktop"}>
        <div className="play step1 text-start mt-md-5 pt-md-5 pt-4">
          <Link to={`/`} className="d-flex align-items-center col-md-3 mb-3 text-decoration-none">
            <span className="fas fa-chevron-left me-2"></span> GO HOME
          </Link>
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src="https://i.imgur.com/JvVAsLn.png" alt="First slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="https://i.imgur.com/JvVAsLn.png" alt="Second slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="https://i.imgur.com/JvVAsLn.png" alt="Third slide" />
              </div>
            </div>
          </div>

          <div className="container marketing">


            <hr className="featurette-divider" />

            <div className="row featurette">
              <div className="col-md-12">
                <h1 className="featurette-heading">Bug Bounty</h1>
                <p className="lead">
                  DCF may choose to pay higher rewards for unusually clever or severe vulnerabilities or lower rewards for vulnerabilities that require significant or unusual user interaction.
                  <br />
                  <br />
                  To recognize their efforts and the important role they play in keeping DCF safe for everyone, <h4 className="fst-italic"><b>we offer a bounty for reporting certain qualifying security vulnerabilities.</b></h4>
                  <br />
                  Please make sure you review the following program rules before you report a vulnerability. By participating in this program, you agree to be bound by these rules.

                </p>
              </div>
            </div>
            <hr className="featurette-divider" />

            <div className="row featurette">
              <div className="col-md-12">
                <h1 className="featurette-heading">Program Rules</h1>
                <p className="lead">
                  DCF may choose to pay higher rewards for unusually clever or severe vulnerabilities or lower rewards for vulnerabilities that require significant or unusual user interaction.
                  <br />
                  <br />
                </p>
                <div className="table-responsive">
                  <table className="table table-dark">
                    <thead>
                      <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Examples</th>
                        <th scope="col">degencoinflip.com</th>
                        <th scope="col">live.degencoinfilp.com</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Remote code execution</th>
                        <td>Smart contract exploit, command injection</td>
                        <td>$10,000</td>
                        <td>$0</td>
                      </tr>
                      <tr>
                        <th scope="row">Unrestricted access to data (filesystem, database, etc.)</th>
                        <td>XXE, SQLi</td>
                        <td>$2,000</td>
                        <td>$0</td>
                      </tr>
                      <tr>
                        <th scope="row">Account takeover</th>
                        <td>Auth vulnerabilities</td>
                        <td>$500</td>
                        <td>$0</td>
                      </tr>
                      <tr>
                        <th scope="row">Perform activities on behalf of a user</th>
                        <td>XSS, Android Intent abuse</td>
                        <td>$300</td>
                        <td>$0</td>
                      </tr>
                      <tr>
                        <th scope="row">Other valid vulnerabilities</th>
                        <td>CSRF, clickjacking, information leakage</td>
                        <td>$100</td>
                        <td>$0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <br />
              </div>
            </div>

            <hr className="featurette-divider" />

            <div className="row featurette">
              <div className="col-md-12">
                <h1 className="featurette-heading">Report Eligibility</h1>
                <p className="lead">
                  Any design or implementation issue that is reproducible and substantially affects the security of DCF and users is likely to be in scope for the program. Consider what an attack scenario would look like, and how an attacker might benefit? What are the consequences to the victim?
                  <br />
                  <br />
                  <a href="https://bughunters.google.com/" rel="noopener noreferrer" target="_blank">The Google Bug Hunters University guide</a> may be useful in considering whether an issue has security impact.
                  Only reports that meet the following requirements are eligible to receive a monetary reward:
                  <br />
                  <br />
                  <ul>
                    <li>You must be the first reporter of the vulnerability</li>
                    <li>The vulnerability must demonstrate security impact to a site or application in scope (see above)</li>
                    <li>You must not have compromised the privacy of our users</li>
                    <li>You must not have publicly disclosed the vulnerability prior to the report being closed</li>
                    <li>We are not legally prohibited from rewarding you</li>
                  </ul>

                  <br />
                  Depending on their impact, issues may qualify for a monetary reward; all reports are reviewed on a case-by-case basis and any report that results in a change being made will at a minimum receive Hall of Fame recognition.
                  <br />
                  <br />
                  Performing actions that may negatively affect DCF users (e.g., spam, denial of service), or sending reports from automated tools without verifying them will immediately disqualify the report.

                </p>
              </div>
            </div>
            <hr className="featurette-divider" />
            <br />

            <div className="row featurette">
              <div className="col-md-12">
                <h1 className="featurette-heading">Fine Print</h1>
                <p className="lead">
                  We may modify the terms of this program or terminate this program at any time. We won’t apply any changes we make to these program terms retroactively.
                  <br />
                </p>
              </div>
            </div>
            <br />

            <hr className="featurette-divider" />
            <br />

            <div className="row featurette">
              <div className="col-md-12 row">
                <h1 className="featurette-heading">Hall of Fame</h1>
                <br />
                <div className="col-lg-4">
                  <img className="rounded-circle" src="https://i.imgur.com/5cEg90u.jpg" alt="J◎E" width="140" height="140" />
                  <h2 className="featurette-heading mt-2">J◎E</h2>
                  <p className="lead">building a work-coordination protocol on Solana <a href="https://twitter.com/search?q=%23riptide&src=hashtag_click" target="_blank" rel="noopener noreferrer">#riptide</a> hackathon submission: <a href="https://twitter.com/cambrian_dev" target="_blank" rel="noopener noreferrer">@cambrian_dev</a></p>
                  <p className="lead"><a className="btn btn-twitter" href="https://twitter.com/joebuild" rel="noopener noreferrer" role="button" target="_blank">@joebuild »</a></p>
                </div>
                <div className="col-lg-4">
                  <img className="rounded-circle" src="https://i.imgur.com/vF8JRqR.jpg" alt="faux 🦀" width="140" height="140" />
                  <h2 className="featurette-heading mt-2">faux 🦀</h2>
                  <p className="lead">dev <a href="https://twitter.com/hxronetwork" target="_blank" rel="noopener noreferrer">@hxronetwork</a>, previously <a href="https://twitter.com/Google" target="_blank" rel="noopener noreferrer">@Google</a></p>
                  <p className="lead"><a className="btn btn-twitter" href="https://twitter.com/fauxfire_" rel="noopener noreferrer" role="button" target="_blank">@fauxfire_ »</a></p>
                </div>
                <div className="col-lg-4">
                  <img className="rounded-circle" src="https://i.imgur.com/jNdb73w.png" alt="realTedJ" width="140" height="140" />
                  <h2 className="featurette-heading mt-2">Ted</h2>
                  <p className="lead">Building something special…</p>
                  <p className="lead"><a className="btn btn-twitter" href="https://twitter.com/realtedj" rel="noopener noreferrer" role="button" target="_blank">@realTedJ »</a></p>
                </div>
              </div>
            </div>

            <hr className="featurette-divider" />

            <div class="px-4 py-5 my-5 text-center">
              <img class="d-block mx-auto mb-4" src="https://dcf-playerscard.s3.us-east-2.amazonaws.com/assets/baby.svg" alt="baby" width="72" height="57" />
              <h1 class="display-5 fw-bold">Contact us</h1>
              <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">
                  Email us at <a href="mailto:degencoinflipinbox@gmail.com">degencoinflipinbox@gmail.com</a>.
                </p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <a href="mailto:degencoinflipinbox@gmail.com"> <button type="button" class="btn btn-dark btn-lg px-4 gap-3">Send Email</button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}