import { useEffect } from 'react';
import HeaderInfo from '../components/HeaderInfo';
// import MintContainer from '../components/MintContainer';
import DisabledButton from '../components/MintContainer/DisabledButton';

export default function IndexPage() {

  useEffect(() => {
    const script = document.createElement('script');
  
    script.innerHTML = `
      var acc = document.getElementsByClassName("accordion");
      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          /* Toggle between adding and removing the "active" class, to highlight the button that controls the panel */
          this.classList.toggle("active");
          this.classList.toggle("minus");

          /* Toggle between hiding and showing the active panel */
          var panel = this.nextElementSibling;

          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        });
      }
    `;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <>
      <header>
        <nav>
          <div class="nav-brand">
            <a href="/">
              <img
                src="images/ZenSportsia_logo.png"
                alt="Zensportsia Logo"
                class="toggler-btn"
              />
            </a>
          </div>
          <div class="menu">
            <ul>
              <li>
                <a href="#Story" class="menu-link">Story</a>
              </li>
              <li><a href="#Characters" class="menu-link">NFT's</a></li>

              <li><a href="#Community" class="menu-link">Community</a></li>

              <li><a href="#Benefits" class="menu-link">Benefits</a></li>

              <li><a href="#Team" class="menu-link">Team</a></li>
              <li><a href="#Roadmap" class="menu-link">Roadmap</a></li>

              <li><a href="#Minting" class="menu-link">Minting</a></li>

              <li><a href="#FAQs" class="menu-link">FAQ's</a></li>
              <li>
                <a
                  href="https://zensports.docsend.com/view/vbkktmajad97jjid"
                  target="_blank"
                  class="menu-link"
                  >Whitepaper</a
                >
              </li>
            </ul>
          </div>
          <HeaderInfo />
        </nav>

        <div class="hero-content">
          <h1>The Future of Athletes is Here</h1>

          <p>
            ZenSportsia is a metaverse for the future athlete. Our collection of
            NFT’s are athletes that are stronger, faster, smarter than anything
            you’ve ever seen. Mint your own ZenSportsian NFT today to up your game
            and earn benefits in the sports and gaming world.
          </p>
          <DisabledButton />
        </div>

        <img src="images/hero-badge.png" alt="badge" class="bgBadge" />
        <img src="images/hero-football.png" alt="football" class="bgFootball" />
      </header>

      <section id="Story" class="services">
        <div class="container">
          <div class="col-md-12">
            <div class="section-title row">
              <div class="col-md-6">
                <h2>ZenSportsia Story</h2>
                <p>
                  It’s the year 2138. Professional (and even amateur) athletes
                  have turned into complete beasts. They’re ripped from
                  head-to-toe, their biceps are bigger than
                  <a
                    href="https://mobile.twitter.com/ajdillonlegs"
                    target="_blank"
                    >AJ Dillon's legs</a
                  >, and they can run a triathlon on Saturday and still play four
                  quarters of football plus overtime on Sunday.
                </p>
                <p>
                  The most cerebral people in the world are also athletes. They
                  can out-think and out-maneuver Nobel Prize winners and
                  <a
                    href="https://en.wikipedia.org/wiki/Deep_Blue_(chess_computer)"
                    target="_blank"
                    >Deep Blue</a
                  >
                  as they navigate metaverse worlds created by the most advanced
                  developers in the world.
                </p>
                <p>
                  Esports athletes have developed rapidly, sporting reaction times
                  that make Shroud look like a Stormtrooper and mechanical skills
                  akin to Mongraal on four glasses of Gfuel. They can play harder,
                  faster, and longer than ever before - both on the pitch and in
                  the arena.
                </p>
                <p>Become a part of the future of esports and gaming.</p>
                <p><span>Welcome to ZenSportsia!</span></p>
              </div>
              <div class="col-md-6">
                <div class="video-frame">
                  <iframe
                    src="https://www.youtube.com/embed/kldYh6p6v8Q"
                    class="o-video lazyload"
                    frameborder="0"
                    title="Welcome to Zensportsia!"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                  >
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        <img
          src="images/sec1-soccer.png"
          alt="soccer"
          class="bgSoccer"
          loading="lazy"
        />
        <div id="Characters">
          <div class="col-lx-10 col-md-12">
            <div class="storyHead sample">
              <h4>Sample ZenSportsian NFT's</h4>
            </div>
            <div class="row characters">
              <div class="col-md-4 d-flex align-items-stretch">
                {/* <!--<div class="icon-box">--> */}
                <img
                  src="images/NFT_character_1-1.jpg"
                  alt="NFT Character 1"
                  class="img-nft"
                />
              </div>

              <div class="col-md-4 d-flex align-items-stretch">
                {/* <!--<div class="icon-box">--> */}
                <img
                  src="images/NFT_character_2-1.jpg"
                  alt="NFT Character 2"
                  class="img-nft"
                />
              </div>

              <div class="col-md-4 d-flex align-items-stretch">
                {/* <!--<div class="icon-box">--> */}
                <img
                  src="images/NFT_character_3-1.jpg"
                  alt="NFT Character 3"
                  class="img-nft"
                />
              </div>
            </div>
            <div class="row characters">
              <div class="col-md-4 d-flex align-items-stretch">
                <img
                  src="images/NFT_character_4.jpg"
                  alt="NFT Character 4"
                  class="img-nft"
                />
              </div>

              <div class="col-md-4 d-flex align-items-stretch">
                <img
                  src="images/NFT_character_5.jpg"
                  alt="NFT Character 5"
                  class="img-nft"
                />
              </div>

              <div class="col-md-4 d-flex align-items-stretch">
                <img
                  src="images/NFT_character_6.jpg"
                  alt="NFT Character 6"
                  class="img-nft"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="Community" class="how_it_works">
        <div class="container">
          <div class="col-md-10 community">
            <p><span>Community</span></p>
            <h4>Our Community</h4>
            <p>
              ZenSportsia is made up of gamers, sports bettors, athletes, and
              fans. We are passionate about all things sports, from playing
              Esports tournaments to betting on the Superbowl to watching future
              athletes crush it. We are competitive and we like to win, but we’re
              here to help each other out, answer each other’s questions, and
              improve each other’s gaming skills. Come and join the most inclusive
              yet competitive sports community. Your home is ZenSportsia.
            </p>
          </div>

          <div class="row">
            <div class="col-md-12 benefits" id="Benefits">
              <p><span>Your Benefits</span></p>
              <h4>ZenSportsian NFT Benefits</h4>
              <ol>
                <li>
                  Monthly prize drawings for luxurious in-person sporting events.
                  For example, win an all-expense paid trip for two to watch the
                  Superbowl or the World Cup in person.
                </li>
                <li>
                  Esports tournament benefits, including monthly invite-only
                  tournaments, reduced entry fees, mulligan cards, side
                  tournaments, and even special rule sets.
                </li>
                <li>
                  Annual Esports Tournament Championship Series with significant
                  prize money added.
                </li>
                <li>
                  Access to exclusive Discord channel with NFT and cryptocurrency
                  giveaways.
                </li>
                <li>
                  Discount fees and increased rewards across the ZenSports betting
                  app and cryptocurrency trading exchange.
                </li>
                <li>
                  Exclusive in-person networking events across the globe. For
                  example, World Cup watch parties with food and beverage
                  provided, etc.
                </li>
                <li>
                  Automatic highest-tier status at all in-person ZenSports
                  locations and casinos (currently Big Wheel Casino in Nevada, but
                  more locations to come soon).
                </li>
                <li>
                  Access to the ZenSportsia online membership portal with
                  additional sports and gaming perks, discounts, and rewards.
                </li>
              </ol>
            </div>
          </div>
        </div>
        <img
          src="images/sec3-badges.png"
          alt="badges"
          class="badgesImg"
          loading="lazy"
        />
        <div class="container creators">
          <div class="storyHead" id="Team">
            <p><span>OUR TEAM & STORY</span></p>
            <h4>MEET THE CREATORS</h4>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="story">
                <p>
                  ZenSportsia was created by the
                  <a href="https://zensports.com/#team" target="_blank"
                    >ZenSports team</a
                  >, which originally started back in 2016 under the founding of
                  Mark Thomas. Originally just an app for friends to meet up and
                  play recreation sports, ZenSports pivoted to sports betting in
                  2019 and in August 2021,
                  <a
                    href="https://zensports.com/blog/zensports-receives-its-nevada-gaming-license/"
                    target="_blank"
                    >ZenSports received a rare and difficult-to-get Nevada
                    non-restricted gaming license</a
                  >, which allows ZenSports to conduct any form of legal gaming
                  within the state of Nevada, including slots, table games, and of
                  course, sports betting.
                </p>
                <p>
                  ZenSports also provides a variety of Esports tournament software
                  features and services that can bring any tournament to life,
                  including tournament brackets, registration and payments,
                  broadcasting / streaming via Twitch, chatting via Discord, and
                  prizes/rewards using cryptocurrencies and NFT’s. On the Esports
                  side of the business, ZenSports signed a deal with
                  <a href="https://splinterlands.com/" target="_blank"
                    >Splinterlands</a
                  >
                  in June 2021 to host their tournaments in the ZenSports app.
                  Splinterlands has over 400,000 daily active users and is one of
                  the fastest growing blockchain based games in Esports. ZenSports
                  has grown its Discord channel to over 4,000 members in just a
                  few months and hosted over 40 individual Esports tournaments in
                  2021.
                </p>
                <p>
                  ZenSports also offers more options for how sports bettors and
                  gamers can fund their accounts, wager, and earn rewards. Funding
                  can take place using traditional fiat methods, such as
                  debit/credit cards and wire transfers, as well as a variety of
                  cryptocurrency options, such as the crypto form of Dollars
                  (Tether), Bitcoin, and
                  <a
                    href="https://zensports.com/blog/zensports-esports-and-sports-tokens/"
                    target="_blank"
                    >ZenSports’ proprietary token called SPORTS</a
                  >. Almost 100% of the funding in ZenSports takes place using
                  cryptocurrencies. ZenSports is proving out a real-world use case
                  for cryptocurrencies that consumers are using in their everyday
                  lives.
                </p>
                <p>
                  The ZenSports team is insanely passionate about
                  decentralization, and particularly, decentralized finance and
                  gaming. The team believes that traditional banks and financial
                  institutions are a cancer on payments, managing wealth, and even
                  entrepreneurship. The launch of ZenSportsians NFT’s and
                  ZenSports’ NFT marketplace represent our commitment to
                  decentralization and the movement of money, with a focus on an
                  industry that we can all get excited about – sports and gaming.
                </p>
              </div>
            </div>

            <div class="col-md-6">
              {/* <!--<div class="storyHead" id="our_team">
              <p><span>Our team</span></p>
              <h4>Meet the Creators</h4>
            </div>--> */}

              {/* <!-- Slideshow section --> */}
              <div class="carousel">
                <div class="splide">
                  <div class="splide__track">
                    <ul class="splide__list">
                      <li class="splide__slide">
                        <div class="team-circle">
                          <img
                            src="images/MarkT_Avatar1-2.png"
                            alt="Mark Thomas"
                          />
                        </div>
                        <div class="social">
                          <a
                            target="_blank"
                            href="https://www.linkedin.com/in/entrepreneursf/"
                          >
                            <img alt="LinkedIn" src="images/linkedin.png" />
                          </a>
                        </div>
                        <h4>Mark Thomas</h4>
                        <span>The Founder</span>
                      </li>
                      <li class="splide__slide">
                        <div class="team-circle">
                          <img
                            src="images/Jacob_Avatar1-2.png"
                            alt="Jacob Shrader"
                          />
                        </div>
                        <div class="social">
                          <a
                            target="_blank"
                            href="https://www.linkedin.com/in/jacob-shrader-b172a5171/"
                          >
                            <img alt="LinkedIn" src="images/linkedin.png" />
                          </a>
                        </div>
                        <h4>Jacob Shrader</h4>
                        <span>The Game Director</span>
                      </li>

                      <li class="splide__slide">
                        <div class="team-circle">
                          <img src="images/John_Avatar1.png" alt="John Dulay" />
                        </div>
                        <div class="social">
                          <a
                            target="_blank"
                            href="https://www.linkedin.com/in/jidulay"
                          >
                            <img alt="LinkedIn" src="images/linkedin.png" />
                          </a>
                        </div>
                        <h4>John Dulay</h4>
                        <span>The Play Maker</span>
                      </li>

                      <li class="splide__slide">
                        <div class="team-circle">
                          <img
                            src="images/MarkS_Avatar1-2.png"
                            alt="Mark Saldana"
                            loading="lazy"
                          />
                        </div>
                        <div class="social">
                          <a
                            target="_blank"
                            href="https://www.linkedin.com/in/markjsaldana"
                          >
                            <img alt="LinkedIn" src="images/linkedin.png" />
                          </a>
                        </div>
                        <h4>Mark Saldana</h4>
                        <span>NFT Newb</span>
                      </li>
                      <li class="splide__slide">
                        <div class="team-circle">
                          <img
                            src="images/Ken_Avatar1-2.png"
                            alt="Ken Ore"
                            loading="lazy"
                          />
                        </div>
                        <div class="social">
                          <a
                            target="_blank"
                            href="https://www.linkedin.com/in/ken-ore/"
                          >
                            <img alt="LinkedIn" src="images/linkedin.png" />
                          </a>
                        </div>
                        <h4>Ken Ore</h4>
                        <span>Fanduel Artist</span>
                      </li>

                      <li class="splide__slide">
                        <div class="team-circle">
                          <img
                            src="images/Enmanuel_Avatar1.png"
                            alt="Enmanuel Carcamo"
                            loading="lazy"
                          />
                        </div>
                        <div class="social">
                          <a
                            target="_blank"
                            href="https://www.linkedin.com/in/enmanuel-carcamo-b696b3177/"
                          >
                            <img alt="LinkedIn" src="images/linkedin.png" />
                          </a>
                        </div>
                        <h4>Enmanuel Carcamo</h4>
                        <span>Mrfiretruckman</span>
                      </li>

                      <li class="splide__slide">
                        <div class="team-circle">
                          <img
                            src="images/Ryan_Avatar1.png"
                            alt="Ryan Hebert"
                            loading="lazy"
                          />
                        </div>
                        <div class="social">
                          <a
                            target="_blank"
                            href="https://www.linkedin.com/in/ryan-b-hebert-36768a135/"
                          >
                            <img alt="LinkedIn" src="images/linkedin.png" />
                          </a>
                        </div>
                        <h4>Ryan Hebert</h4>
                        <span>The Wizard</span>
                      </li>

                      <li class="splide__slide">
                        <div class="team-circle">
                          <img
                            src="images/Jesus_Avatar1.png"
                            alt="Jesus Salazar"
                            loading="lazy"
                          />
                        </div>
                        <div class="social">
                          <a
                            target="_blank"
                            href="https://www.linkedin.com/in/jsalazar2010/"
                          >
                            <img alt="LinkedIn" src="images/linkedin.png" />
                          </a>
                        </div>
                        <h4>Jesus Salazar</h4>
                        <span>The Frontend Guru</span>
                      </li>
                      <li class="splide__slide">
                        <div class="team-circle">
                          <img
                            src="images/Gigi_Avatar1.png"
                            alt="Gigi Chang"
                            loading="lazy"
                          />
                        </div>
                        <div class="social">
                          <a
                            target="_blank"
                            href="https://www.linkedin.com/in/gigi-chang-14585559"
                          >
                            <img alt="LinkedIn" src="images/linkedin.png" />
                          </a>
                        </div>
                        <h4>Gigi Chang</h4>
                        <span>Design Aficionado</span>
                      </li>

                      <li class="splide__slide">
                        <div class="team-circle">
                          <img
                            src="images/Ally_Avatar1.png"
                            alt="Ally Mielnicki"
                            loading="lazy"
                          />
                        </div>
                        <div class="social">
                          <a
                            target="_blank"
                            href="https://www.linkedin.com/in/allymielnicki"
                          >
                            <img alt="LinkedIn" src="images/linkedin.png" />
                          </a>
                        </div>
                        <h4>Ally Mielnicki</h4>
                        <span>Master Marketer</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p class="teamP">
                  Want to see the real headshots, titles, and bios of the
                  ZenSportsia team, along with the rest of the ZenSports team and
                  investors?
                  <a href="https://zensports.com/#team" target="_blank"
                    >Click HERE</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="Roadmap" class="roadmap">
        <div class="storyHead">
          <p><span>Zensports & Zensportsia Roadmap</span></p>
          <h4>Roadmap</h4>
        </div>
        <div class="roadmap-desktop">
          <img
            src="images/Roadmap-1x-2.png"
            alt="Zensportsia Roadmap"
            class="roadmap-img"
          />
        </div>
        <div class="roadmap-mobile">
          <img
            src="images/Roadmap_1x-2_mobile.png"
            alt="Zensportsia Roadmap"
            class="roadmap-img"
          />
        </div>
      </section>

      <section id="Minting" class="minting">
        <img
          src="images/coin-left.png"
          alt="coin-left"
          class="coin-left"
          loading="lazy"
        />
        <img
          src="images/coin-right.png"
          alt="coin-right"
          class="coin-right"
          loading="lazy"
        />

        <div class="container">
          <div class="storyHead">
            <p><span>Minting</span></p>
            <h4>Minting Process and Economics</h4>
          </div>

          <div class="col-md-6 economics">
            <ul>
              <li>
                10,000 NFT Collectible, allocated as follows:
                <ul>
                  <li>
                    5,000 (50%) available during the pre-sale to whitelist
                    members.
                  </li>
                  <li>4,800 (48%) available for sale to the general public.</li>
                  <li>
                    200 (2%) gifted to ZenSports team members and investors.
                  </li>
                </ul>
              </li>
              <li>
                Cost:
                <ul>
                  <li>
                    <span>.10 ETH</span> minting cost per NFT during pre-sale to
                    whitelist members.
                  </li>

                  <li>
                    <span>.15 ETH</span> minting cost per NFT during sale to the
                    general public.
                  </li>
                </ul>
              </li>

              <li>
                Buy up to 5 NFT's per mint/transaction and there is
                <span>no limit</span> to the number of mints/transactions that you
                can create up until the allocation of NFT’s for that particular
                minting group has been filled (i.e. up until 5,000 have been
                minted during the pre-sale and up until 4,800 have been minted
                during the general public sale).
              </li>

              <li>2.5% of resales (trading) go to ZenSports.</li>
              <li>
                Whitelist minting will begin at
                <span>10:00am Eastern Time on Monday, March 28, 2022:</span>
                <ul>
                  <li>Whitelist positions can mint during the first 24 hours.</li>
                  <li>
                    After the first 24 hours of whitelist minting, there will be a
                    24 hour break where no minting will occur. Once those 48 hours
                    in total have passed, then the public minting will begin. 
                  </li>
                </ul>
              </li>

              <li>
                Rarity:
                <ul>
                  <li>Differing rarity based on traits.</li>
                  <li>
                    A small percentage of the total supply is classified as rare.
                  </li>
                  <li>
                    A slightly larger percentage of the total supply is classified
                    as semi-rare.
                  </li>
                  <li>Remaining NFT's have normal rarity.</li>
                </ul>
              </li>

              <li>
                Minted on OpenSea trading marketplace. ZenSports to also launch an
                NFT trading marketplace in 2022.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="faq" id="FAQs">
        <div class="container">
          <div class="storyHead">
            <p><span>FREQUENTLY ASKED QUESTIONS</span></p>
            <h4>FAQ'S</h4>
          </div>

          <button class="accordion">
            What are ZenSportsians?<i class="plus"></i>
          </button>
          <div class="panel">
            <p>
              ZenSportsians are a collection of 10,000 randomly generated
              e-athletes that provide utility benefits through the ZenSportsia
              metaverse and ZenSports online gaming community and sports betting
              app.
            </p>
          </div>

          <button class="accordion">How can I mint?<i class="plus"></i></button>
          <div class="panel">
            <p>
              You can mint ZenSportsians by joining the whitelist. Just click the
              “NFT MINTING WHITELIST” button at the top, pay the .10 ETH minting
              fee, and you’ll receive your ZenSportsian NFT on
              <a href="https://opensea.io/" target="_blank">OpenSea</a>. :)
            </p>
          </div>

          <button class="accordion">
            What benefits do I get from owning a ZenSportsian?<i class="plus"></i>
          </button>
          <div class="panel">
            <p>
              ZenSports will provide ongoing incentives for owning ZenSportsians,
              including exclusive community channels, prize giveaways,
              tournaments, rewards, and even IRL events. Check the ZENSPORTSIAN
              NFT BENEFITS section above for more details.
            </p>
          </div>

          <button class="accordion">
            How do I know ZenSportsia and/or ZenSports is legit?<i
              class="plus"
            ></i>
          </button>
          <div class="panel">
            <p>
              For starters, ZenSports recently acquired an Nevada Gaming License,
              which means our founding team had to go through a 12-month long
              extensive investigation process that is harder than a top secret
              security clearance. We are real people developing real,
              decentralized products and services. We are not some anonymous group
              -
              <a href="https://www.zensports.com/#team" target="_blank"
                >check out our biographies and LinkedIn profiles here</a
              >.
            </p>
          </div>
        </div>
      </section>

      <footer id="footer">
        <div class="container">
          <div class="row">
            <div class="col-md-10">
              <p>
                &copy;
                <script>
                  document.write(new Date().getFullYear());
                </script>
                ZenSportsia. All rights reserved.
              </p>
            </div>

            <div class="nav-toggler col-md-2">
              <a
                href="https://discord.gg/gnwAUarJtx"
                target="_blank"
                title="Discord"
              >
                <img
                  src="images/discord_icon.png"
                  alt="twitter"
                  class="toggler-btn"
                />
              </a>
              <a
                href="https://twitter.com/zensportsia"
                target="_blank"
                title="Twitter"
              >
                <img
                  src="images/twitter_icon.png"
                  alt="twitter"
                  class="toggler-btn"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
