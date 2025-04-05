const commonWords = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", 
    "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one"
  ];
  
  const mediumWords = [
    "between", "important", "children", "example", "family", "history", "question", "business", "something", "different",
    "experience", "information", "available", "community", "government"
  ];
  
  const hardWords = [
    "necessarily", "particularly", "sophisticated", "environment", "understanding", "entertainment", "international", 
    "organization", "communication", "development"
  ];
  
  export const generateText = (difficulty = 'medium', wordCount = 25) => {
    const wordPool = difficulty === 'easy' ? commonWords : 
                    difficulty === 'hard' ? [...mediumWords, ...hardWords] : 
                    [...commonWords, ...mediumWords];
  
    const result = [];
    for (let i = 0; i < wordCount; i++) {
      let newWord;
      do {
        newWord = wordPool[Math.floor(Math.random() * wordPool.length)];
      } while (i > 0 && newWord === result[i - 1]);
      result.push(newWord);
    }
  
    return result.join(' ');
  };