interface TweetCardProps {
  text: string;
  highlights: string[];
  tweetUrl: string;
}

const TweetCard = ({ text, highlights, tweetUrl }: TweetCardProps) => {
  return (
    <div className="rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
      <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="block">
        <p className="text-lg">
          {text.split(' ').map((word, index) => (
            highlights.includes(word) ? (
              <span key={index} className="bg-blue-100 dark:bg-blue-900 px-1 rounded">{word}</span>
            ) : ` ${word} `
          ))}
        </p>
      </a>
    </div>
  );
};

export default TweetCard; 