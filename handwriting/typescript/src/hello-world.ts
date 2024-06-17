// expected to be string
// type HelloWorld = any

// you should make this work
// type test = Expect<Equal<HelloWorld, string>>
import type { Equal, Expect, NotAny } from "@type-challenges/utils";

type HelloWorld = string;

type cases = [Expect<NotAny<HelloWorld>>, Expect<Equal<HelloWorld, string>>];
