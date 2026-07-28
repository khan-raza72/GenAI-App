//  Asynchronous Callback Example

// function getData(callback) {
//   console.log("Data fetch kar rahe hain...");

//   setTimeout(() => {
//     console.log("Data mil gaya!");
//     callback();
//   }, 2000);
// }

// function processData() {
//   console.log("Ab data process kar rahe hain...");
// }

// getData(processData);

//

// --- ANSI Escape Codes for Terminal Colors ---
const CYAN = "\x1b[38;5;51m";
const WHITE = "\x1b[97m";
const GREY = "\x1b[90m";
const RED = "\x1b[91m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

// Helper function to create a delay (Alternative to Python's time.sleep)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Prints text one character at a time to create a typewriter/hacker effect.
 */
async function typewriterEffect(text, color, speedMs) {
  process.stdout.write(color); // Apply the color
  for (const char of text) {
    process.stdout.write(char);
    await sleep(speedMs); // Pause for the typing effect
  }
  process.stdout.write(RESET + "\n"); // Reset color and move to next line
}

async function main() {
  // Clear the terminal screen
  console.clear();

  // --- Intro Sequence ---
  // Color: Grey, Speed: Fast (20ms)
  const introSequence = [
    '[LOADING] ATMOSPHERE: "HEAVY_RAIN..."',
    "[STATUS] ISOLATION_MODE: ENABLED",
    '[DATA] SEARCHING FOR: "Mera koi na..."',
  ];

  for (const line of introSequence) {
    await typewriterEffect(line, GREY, 20);
  }

  console.log(); // Empty line for spacing
  await sleep(1000); // 1-second pause before lyrics start

  // --- The Lyrics Sequence ---
  // Using an array of objects for text and color
  const lyrics = [
    { text: ">>> Baddalan 'chon diggde hanju, 💧", color: CYAN },
    { text: ">>> Akh meri phir vi royi na... 💧", color: CYAN },
    { text: ">>> Aisi preet la layi rabba, 💧", color: CYAN },
    { text: ">>> Jaisi hor kade hoyi na 💧", color: CYAN },
    { text: ">>> Tere jaan ton main baad", color: WHITE },
    { text: ">>> Ik din soyi na...", color: WHITE },
    { text: ">>> Poora shehar begana, 😔", color: WHITE },
    { text: ">>> ethe mera koi na...", color: WHITE },
  ];

  // Print lyrics with 60ms typing speed and 500ms pause between lines
  for (const line of lyrics) {
    await typewriterEffect(line.text, line.color, 60);
    await sleep(500);
  }

  // --- Outro Sequence ---
  // Empty line followed by Bold Red error message
  console.log();
  await typewriterEffect("[ERROR] SOUL_NOT_FOUND", BOLD + RED, 60);
}

// Execute the main function
main();
