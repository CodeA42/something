export function md4(message: string): string {
  return message;
}

const result = md4("The quick brown fox jumps over the lazy dog");
const expectedResult = "1bee69a46ba811185c194762abaeae90";

console.log(result);
if (result === expectedResult) {
  console.log("SUCCESS");
} else {
  console.error("FAILURE");
}
