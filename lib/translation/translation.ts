export async function translate(
    word: string,
    from: string,
    to: string
): Promise<string> {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${from}|${to}`;
    const res = await fetch(url);
    const data = await res.json();
 
    return data.responseData.translatedText;
}