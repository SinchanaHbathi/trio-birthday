
import { useEffect, useRef, useState } from "react";
import "./App.css";

// =====================================
// EDIT YOUR PHOTOS AND VIDEOS HERE
// Put your files inside public/memories/
// =====================================


const childhoodPhoto = `${import.meta.env.BASE_URL}memories/childhood.jpeg`;


const galleryPhotos = [
  "/memories/photo1.jpeg",
  "/memories/photo2.jpeg",
  "/memories/photo3.jpeg",
  "/memories/photo4.jpeg",
  "/memories/photo5.jpeg",
  "/memories/photo6.jpeg",
];

const memoryVideos = [
  "/memories/video1.mp4",
  "/memories/video2.mp4",
  "/memories/video3.mp4",
  "/memories/video4.mp4",
  "/memories/video5.mp4",
];

const boyfriendQuestions = [
  {
    question: "Who whould you choose?😂",
    options: [
      "SURYA U P",
      "MECH",
      "SUJAN H M",
      "ALL",
    ],
    answer: 4,
  },
  {
    question: "Who deserves a friendship award?",
    options: [
      "TANU",
      "ME🏆",
      "SINCH",
      "ALL OF THE ABOVE",
    ],
    answer: 1,
  },
  {
    question: "Who approves the boyfriend?",
    options: [
      "Google",
      "The stars",
      "The family group chat",
      "Her two chummies",
    ],
    answer: 3,
  },
];

// =====================================
// 1. FAKE STORAGE WARNING
// =====================================

function StorageWarning({ onContinue }) {
  return (
    <main className="storage-page">
      <div className="warning-card">
        <div className="warning-icon">!</div>

        <p className="warning-small">THREAT STATUS : SUSPICIOUS</p>

        <h1>STORAGE FULL</h1>

        <div className="warning-line" />

        <p className="warning-message">
          Your device has run out of space.
        </p>

        <p className="warning-detail">
          Your phone may have been compromised.
          <br />
          Your account has been taken over by someone who knows you VERY well.
        </p>

        <div className="fake-progress">
          <span />
        </div>

        <p className="storage-caption">
          CRITICAL WARNING
        </p>

        <button className="warning-button" onClick={onContinue}>
          TRY AGAIN
        </button>

        <p className="fake-disclaimer">
          Device storage checked · Take a look
        </p>
      </div>
    </main>
  );
}

// =====================================
// 2. SURPRISE REVEAL
// =====================================

function SurprisePage({ onContinue }) {
  return (
    <section className="surprise-page">
      <div className="surprise-content">
        <span className="surprise-heart">♡</span>

        <p className="eyebrow">Ohhhh waittttt sukK!</p>

        <h1>
          HAHA,<span>GOT YOUUUU!</span> 
        </h1>

        <div className="surprise-divider" />

        <h2>Hello, Birthday Girl!</h2>

        <p className="surprise-description">
          Your only crime is being our favorite person.
        </p>

        <p className="surprise-note">
          We've got a little surprise for youuu♡
        </p>

        <button className="primary-btn surprise-btn" onClick={onContinue}>
          LET'S GO???
        </button>

        <p className="surprise-footer">
          MADE WITH LOVE · YOUR CHUMMIES
        </p>
      </div>
    </section>
  );
}

// =====================================
// 3. SCRATCH CARD
// =====================================

function ScratchCard({ onContinue }) {
  const canvasRef = useRef(null);
  const scratching = useRef(false);
  const revealedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#b9b9c2";
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "#5b5261";
    ctx.textAlign = "center";
    ctx.font = "bold 23px sans-serif";
    ctx.fillText("SCRATCH HERE", rect.width / 2, rect.height / 2 - 8);

    ctx.font = "16px sans-serif";
    ctx.fillText("Use your finger ♡", rect.width / 2, rect.height / 2 + 24);

    ctx.font = "30px sans-serif";
    ctx.fillText("✦", rect.width / 2, rect.height / 2 - 50);
  }, []);

  function scratch(e) {
    if (!scratching.current || revealedRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 23, 0, Math.PI * 2);
    ctx.fill();

    // Estimate how much of the overlay has been removed.
    const pixels = ctx.getImageData(
      0, 0, canvas.width, canvas.height
    ).data;

    let transparent = 0;
    const total = pixels.length / 4;
    const sampleEvery = 100;

    for (let i = 3; i < pixels.length; i += 4 * sampleEvery) {
      if (pixels[i] < 50) transparent++;
    }

    const amount = Math.min(
      100,
      Math.round((transparent / (total / sampleEvery)) * 100)
    );

    setProgress(amount);

    if (amount >= 35) {
      revealedRef.current = true;
      setRevealed(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  return (
    <section className="journey-page">
      <div className="journey-card">
        <p className="eyebrow">♡♡♡♡♡</p>
        <h1>DADDY'S LITTLE GIRL</h1>
        <p className="section-description">
          Scratch the card to uncover
        </p>

        <div className="scratch-area">
          <img
            src={childhoodPhoto}
            alt="Our childhood memory"
            className="scratch-photo"
            onError={(e) => {
              e.currentTarget.style.opacity = "0.15";
            }}
          />

          {!revealed && (
            <canvas
              ref={canvasRef}
              className="scratch-canvas"
              onPointerDown={(e) => {
                scratching.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                scratch(e);
              }}
              onPointerMove={scratch}
              onPointerUp={() => {
                scratching.current = false;
              }}
              onPointerCancel={() => {
                scratching.current = false;
              }}
            />
          )}
        </div>

        {revealed ? (
          <>
            <h2 className="reveal-heading">LOOK AT YOU TWO 😭</h2>
            <p className="section-description">
              Before all the birthdays, dreams, and adventures ahead… there was this little girl in her father's arms.
            </p>
            <div className="confetti" aria-hidden="true">
              A LITTLE PIECE OF YOUR STORY
            </div>
            <button className="primary-btn" onClick={onContinue}>
              A LITTLE MORE LOVE →
            </button>
          </>
        ) : (
          <p className="scratch-progress">
            Keep scratching... {progress}%
          </p>
        )}
      </div>
    </section>
  );
}

// =====================================
// QUIZ REUSABLE COMPONENT
// =====================================

function Quiz({ title, subtitle, questions, onContinue, finalMessage }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[index];

  function chooseOption(optionIndex) {
    if (selected !== null) return;
    setSelected(optionIndex);

    if (optionIndex === question.answer) {
      setScore((s) => s + 1);
    }
  }

  function nextQuestion() {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  return (
    <section className="journey-page">
      <div className="quiz-card">
        <p className="eyebrow">{subtitle}</p>
        <h1>{title}</h1>

        {!finished ? (
          <>
            <div className="quiz-progress">
              QUESTION {index + 1} / {questions.length}
            </div>

            <h2 className="quiz-question">{question.question}</h2>

            <div className="quiz-options">
              {question.options.map((option, i) => (
                <button
                  key={option}
                  className={`quiz-option ${
                    selected === i
                      ? i === question.answer
                        ? "correct"
                        : "incorrect"
                      : ""
                  }`}
                  disabled={selected !== null}
                  onClick={() => chooseOption(i)}
                >
                  {option}
                  {selected === i && (
                    <span>{i === question.answer ? " ✓" : " ✕"}</span>
                  )}
                </button>
              ))}
            </div>

            {selected !== null && (
              <div className="quiz-feedback">
                {selected === question.answer
                  ? "Correct! You know well"
                  : "Wrong answer, suk 😂"}
                <button className="primary-btn" onClick={nextQuestion}>
                  {index + 1 === questions.length ? "SEE RESULTS" : "NEXT →"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="quiz-finish">
           
            <p>Congratulations! You officially deserve whatever you selected.</p>
            <h2>{finalMessage}</h2>
            <p>
              Your score: {score}/{questions.length}
            </p>
          
            <button className="primary-btn" onClick={onContinue}>
              NEXT SURPRISE →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}


// =====================================
// BIRTHDAY CANDLE CELEBRATION
// =====================================

function BirthdayCake({ onContinue }) {
  const [wishes, setWishes] = useState(1);
  const [lit, setLit] = useState(false);
  const [wishing, setWishing] = useState(false);
  const [finished, setFinished] = useState(false);
  const [micMessage, setMicMessage] = useState("");
  const micRef = useRef({ stream: null, context: null, raf: 0 });

  function stopMic() {
    cancelAnimationFrame(micRef.current.raf);
    micRef.current.stream?.getTracks().forEach((track) => track.stop());
    micRef.current.context?.close().catch(() => {});
    micRef.current = { stream: null, context: null, raf: 0 };
  }

  useEffect(() => () => stopMic(), []);

  function playBirthdayTune() {
  const audio = new Audio("/audio/birthday.mp3");
  audio.volume = 1;
  audio.play().catch((err) => {
    console.log("Audio playback failed:", err);
  });
}

  function blowOut() {
    if (!lit || !wishing || finished) return;
    stopMic();
    setFinished(true);
    setMicMessage("");
    playBirthdayTune();
  }

  async function startMic() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicMessage("Mic isn't available here. Tap the cake instead ♡");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        stream.getTracks().forEach((track) => track.stop());
        setMicMessage("Tap the cake to blow out the candles ♡");
        return;
      }
      const context = new AudioContextClass();
      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const values = new Uint8Array(analyser.fftSize);
      micRef.current = { stream, context, raf: 0 };
      let loudFrames = 0;
      setMicMessage("Blow gently toward your microphone");
      const listen = () => {
        if (micRef.current.context !== context) return;
        analyser.getByteTimeDomainData(values);
        let sum = 0;
        for (const sample of values) {
          const normalized = (sample - 128) / 128;
          sum += normalized * normalized;
        }
        const volume = Math.sqrt(sum / values.length);
        loudFrames = volume > 0.14 ? loudFrames + 1 : 0;
        if (loudFrames >= 5) {
          blowOut();
          return;
        }
        micRef.current.raf = requestAnimationFrame(listen);
      };
      micRef.current.raf = requestAnimationFrame(listen);
    } catch {
      stopMic();
      setMicMessage("Mic permission wasn't available. Tap the cake instead ♡");
    }
  }

  return (
    <section className={`candle-page ${finished ? "cake-finished" : ""}`}>
      {!finished ? (
        <div className="candle-card">
          <p className="eyebrow">A WISH JUST FOR YOU</p>
          <h1>Make a Birthday Wish ♡</h1>

          {!lit && (
            <>
              <p className="candle-description">
                How many wishes would you like,babe?
              </p>
              <div className="wish-options">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    className={`wish-choice ${wishes === n ? "selected-wish" : ""}`}
                    onClick={() => setWishes(n)}
                  >
                    {n} {n === 1 ? "Wish" : "Wishes"}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="cake-scene">
            <span className="cake-sparkle sparkle-a">✦</span>
            <span className="cake-sparkle sparkle-b">✧</span>
            <div className="candles" aria-label={`${wishes} birthday ${wishes === 1 ? "candle" : "candles"}`}>
              {Array.from({ length: wishes }, (_, i) => (
                <div className="candle-wrap" key={i}>
                  {lit && !finished && <span className="candle-flame" aria-hidden="true">🔥</span>}
                  {finished && <span className="candle-smoke" aria-hidden="true">〰</span>}
                  <div className="candle-stick" style={{ background: i % 2 ? "#B99CE8" : "#E7B0DE" }}>
                    <span className="candle-stripe" />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="birthday-cake-art"
              aria-label={lit && wishing ? "Tap to blow out candles" : "Birthday cake"}
              onClick={() => { if (lit && wishing) blowOut(); }}
            >
              <div className="cake-icing">
                <span className="icing-drip drip-one" />
                <span className="icing-drip drip-two" />
                <span className="icing-drip drip-three" />
              </div>
              <div className="cake-body"><span className="cake-decoration">♡ ♡ ♡</span></div>
              <div className="cake-plate" />
            </button>
          </div>

          {!lit && (
            <button className="primary-btn" onClick={() => setLit(true)}>
              Light the candles
            </button>
          )}

          {lit && !wishing && (
            <div className="wish-stage">
              <p className="candle-description">The room is dark... the little flames are glowing.</p>
              <button className="primary-btn" onClick={() => setWishing(true)}>
                Make a wish
              </button>
            </div>
          )}

          {lit && wishing && (
            <div className="wish-stage">
              <h2 className="wish-message">Close your eyes and make your wish…</h2>
              <p className="candle-description">Whenever you're ready, blow out your candles.</p>
              <div className="blow-actions">
                <button className="primary-btn mic-btn" onClick={startMic}> Blow into the mic/speaker</button>
                <button className="cake-tap-btn" onClick={blowOut}>Tap the cake instead ♡</button>
              </div>
              {micMessage && <p className="mic-message" role="status">{micMessage}</p>}
            </div>
          )}
          <p className="candle-footer">MADE WITH LOVE · YOUR CHUMMIES</p>
        </div>
      ) : (
        <div className="birthday-reveal">
          <div className="reveal-cake" aria-hidden="true">🎂</div>
          <h1>Happy Birthday tuuu you Qayootie patootiee!!</h1>
          <p className="birthday-reveal-message">May all your wishes come true!!</p>
          <button className="primary-btn" onClick={onContinue}>CONTINUE OUR STORY →</button>
        </div>
      )}
    </section>
  );
}

// =====================================
// 6. FRIENDSHIP SHORTS
// =====================================

function Shorts({ onContinue }) {
  const [index, setIndex] = useState(0);
  const [reactions, setReactions] = useState({});
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState("");

  const captions = [
    "POV: THIS gorgeous?😭❤️",
    "Madam attitude level aaa bere, agree?? ",
    "Too excited, but forgot the eating tutorial.",
    "Big achievement of life.",
    "Sometimes, it's just tea with you🥹.",
  ];

  const reaction = reactions[index] || "";
  const currentComments = comments[index] || [];

  function addComment(e) {
    e.preventDefault();
    if (!commentText.trim()) return;

    setComments((prev) => ({
      ...prev,
      [index]: [...(prev[index] || []), commentText.trim()],
    }));

    setCommentText("");
  }

  return (
    <section className="journey-page shorts-page">
      <p className="eyebrow">Our Randomness </p>
      <h1>MOMENTS WITH YOU </h1>
      <p className="section-description">
         A lifetime of love
      </p>

      <div className="shorts-layout">
        <div className="short-video">
          <video
            key={memoryVideos[index]}
            src={memoryVideos[index]}
            controls
            playsInline
            preload="metadata"
            className="memory-video"
          />

          <div className="short-caption">
            <span>Miss Chhotu♡</span>
            <p>{captions[index]}</p>
          </div>

          <div className="short-controls">
            <button
              className={reaction === "like" ? "active-reaction" : ""}
              onClick={() =>
                setReactions((prev) => ({
                  ...prev,
                  [index]: reaction === "like" ? "" : "like",
                }))
              }
            >
              ♥ Like
            </button>

            <button
              className={reaction === "dislike" ? "active-reaction" : ""}
              onClick={() =>
                setReactions((prev) => ({
                  ...prev,
                  [index]: reaction === "dislike" ? "" : "dislike",
                }))
              }
            >
              👎 Dislike
            </button>
          </div>
        </div>

        <div className="comments-panel">
          <h3>Comments ♡</h3>
          <p className="comment-hint">
            Leave a message on this memory.
          </p>

          <div className="comments-list">
            {currentComments.length === 0 && (
              <p className="empty-comments">
                No comments yet. Start the drama 😂
              </p>
            )}

            {currentComments.map((comment, i) => (
              <div className="comment-bubble" key={i}>
                <span>♡</span> {comment}
              </div>
            ))}
          </div>

          <form className="comment-form" onSubmit={addComment}>
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              maxLength={180}
            />
            <button type="submit">Post</button>
          </form>
        </div>
      </div>

      <div className="short-pagination">
        <button
          disabled={index === 0}
          onClick={() => setIndex((i) => i - 1)}
        >
          ←
        </button>

        <span>{index + 1} / 5</span>

        <button
          disabled={index === 4}
          onClick={() => setIndex((i) => i + 1)}
        >
          →
        </button>
      </div>

      <button className="primary-btn" onClick={onContinue}>
        OPEN OUR MEMORY BOOK ♡
      </button>
    </section>
  );
}

// =====================================
// 7. FRIENDSHIP GALLERY
// =====================================

function Gallery({ onContinue }) {
  const [index, setIndex] = useState(0);
  const [opened, setOpened] = useState(false);

  const memories = [
    "The beginning of everything ♡",
    "Our favourite kind of chaos",
    "A memory worth keeping",
    "Laughing until it hurts",
    "Just us being us",
    "And many more to come...",
  ];

  return (
    <section className="journey-page gallery-page">
      <p className="eyebrow">A BOOK OF US</p>
      <h1>Our Little Memory Book</h1>
      <p className="section-description">
        Every picture holds a story.
      </p>

      <div className={`memory-book ${opened ? "book-open" : ""}`}>
        <div className="book-page">
          {!opened ? (
            <button
              className="book-cover"
              onClick={() => setOpened(true)}
            >
              <span>♡</span>
              <h2>OUR STORY</h2>
              <p>We trio.</p>
              <span className="book-open-label">TAP TO OPEN</span>
            </button>
          ) : (
            <div className="book-inside">
              <div className="book-photo-frame">
                <img
                  src={galleryPhotos[index]}
                  alt={`Friendship memory ${index + 1}`}
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                />
                <div className="photo-fallback">♡</div>
              </div>

              <p className="memory-caption">{memories[index]}</p>

              <div className="book-navigation">
                <button
                  disabled={index === 0}
                  onClick={() => setIndex((i) => i - 1)}
                >
                  ←
                </button>
                <span>{index + 1} / {galleryPhotos.length}</span>
                <button
                  disabled={index === galleryPhotos.length - 1}
                  onClick={() => setIndex((i) => i + 1)}
                >
                  →
                </button>
              </div>

              <button
                className="book-close"
                onClick={() => setOpened(false)}
              >
                CLOSE BOOK
              </button>
            </div>
          )}
        </div>
      </div>

      <button className="primary-btn" onClick={onContinue}>
        ONE LAST THING ♡
      </button>
    </section>
  );
}

// =====================================
// 8. FINAL BIRTHDAY PAGE
// =====================================

function SpecialDay() {
  return (
    <section className="birthday-page">
      <div className="birthday-decoration decoration-one">♡</div>
      <div className="birthday-decoration decoration-two">✦</div>
      <div className="birthday-decoration decoration-three">✿</div>

      <div className="birthday-content">
        <p className="eyebrow">YOUR SPECIAL DAY</p>

        <div className="birthday-cake">🎂</div>

        <h1>Happy Birthday, SUKUU!</h1>

        <div className="birthday-divider" />

        <p className="birthday-from">
          From your two forever Chummies♡
        </p>

        <p className="birthday-message">
          Three girls, one beautiful friendship, and a more memories.
        </p>

        <p className="birthday-message">
          No matter how much life changes, you'll always have us.
        </p>

        <p className="birthday-highlight">
          Happy birthday to our favorite person — love you forever! ♡
        </p>

        <div className="birthday-photo-grid">
          {galleryPhotos.slice(0, 3).map((photo, i) => (
            <img
              key={photo}
              src={photo}
              alt={`Our trio memory ${i + 1}`}
              onError={(e) => {
                e.currentTarget.style.opacity = "0";
              }}
            />
          ))}
        </div>

        <p className="trio-signature">WE TRIO · ALWAYS THREE</p>

        <div className="birthday-hearts">♡ ✦ ♡ ✦ ♡</div>

        <button
          className="primary-btn replay-btn"
          onClick={() => window.location.reload()}
        >
          RELIVE OUR STORY ↻
        </button>
      </div>
    </section>
  );
}

// =====================================
// MAIN APP - COMPLETE PAGE FLOW
// =====================================

export default function App() {
  const [screen, setScreen] = useState("storage");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen]);

  return (
    <main className="app-shell">
      {screen === "storage" && (
        <StorageWarning
          onContinue={() => setScreen("surprise")}
        />
      )}

      {screen === "surprise" && (
        <SurprisePage
          onContinue={() => setScreen("scratch")}
        />
      )}

      {screen === "scratch" && (
        <ScratchCard
          onContinue={() => setScreen("memory")}
        />
      )}

      {screen === "memory" && (
        <BirthdayCake onContinue={() => setScreen("boyfriend")} />
      )}

      {screen === "boyfriend" && (
        <Quiz
          title="IMPORTANT   INVESTIGATION"
          questions={boyfriendQuestions}
          finalMessage="Birthday treat is still pending"
          onContinue={() => setScreen("shorts")}
        />
      )}

      {screen === "shorts" && (
        <Shorts onContinue={() => setScreen("gallery")} />
      )}

      {screen === "gallery" && (
        <Gallery onContinue={() => setScreen("birthday")} />
      )}

      {screen === "birthday" && <SpecialDay />}
    </main>
  );
}
