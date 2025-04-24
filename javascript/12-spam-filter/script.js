const messageInput = document.getElementById("message-input");
const result = document.getElementById("result");
const checkMessageButton = document.getElementById("check-message-btn");

// Matches phrases like "please help" or "assist me" (case-insensitive)
const helpRegex = /please help|assist me/i;

// Matches monetary amounts like "100 dollars", "5 thousand dollars", etc.
const dollarRegex = /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i;
// Explanation:
// [0-9]+          -> one or more digits (e.g., 5, 1000)
// \s*             -> optional whitespace
// (?:...)         -> non-capturing group for scale words
// hundred|...     -> optional words like hundred, thousand, etc.
// \s+             -> one or more spaces before "dollars"
// dollars         -> matches the literal word "dollars"
// i               -> case-insensitive

// Matches variations of "free money" using common spam letter substitutions (e.g., 3 for e, 0 for o)
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;
// Explanation:
// (?:^|\s)        -> start of string or a whitespace before the phrase
// fr[e3][e3]      -> matches "free" with possible '3' replacing 'e'
// m[o0]n[e3]y     -> matches "money" with '0' instead of 'o', '3' instead of 'e'
// (?:$|\s)        -> end of string or a whitespace after the phrase
// i               -> case-insensitive

// Matches spam-like phrases such as "stock alert" using character substitutions
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;
// Explanation:
// (?:^|\s)        -> start of string or whitespace
// [s5][t7][o0][c{[(]k -> fuzzy match for "stock" using common substitutions
// [a@4]l[e3]r[t7] -> fuzzy match for "alert" with substitutions
// (?:$|\s)        -> end of string or whitespace
// i               -> case-insensitive

// Matches variations of "dear friend" using character substitutions
const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;
// Explanation:
// (?:^|\s)        -> start of string or whitespace
// d[e3][a@4]r     -> fuzzy match for "dear"
// fr[i1|][e3]nd   -> fuzzy match for "friend", including '1' or '|' for 'i', and '3' for 'e'
// (?:$|\s)        -> end of string or whitespace
// i               -> case-insensitive

// An array of all spam-detecting regex patterns
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

// Checks if a message matches any pattern in the deny list
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));

// Event listener for the "Check Message" button
checkMessageButton.addEventListener("click", () => {
  if (messageInput.value === "") {
    alert("Please enter a message.");
    return;
  }

  result.textContent = isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";
  messageInput.value = ""; // Clear the input after checking
});
