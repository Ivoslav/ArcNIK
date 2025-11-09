import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { CheckCircle2, XCircle, Award } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizCardProps {
  title: string;
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export function QuizCard({ title, questions, onComplete }: QuizCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
      onComplete?.(score);
    }
  };

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 80;

    return (
      <Card className="p-8 text-center">
        <div className={`inline-flex p-4 rounded-full mb-4 ${passed ? "bg-green-100" : "bg-yellow-100"}`}>
          <Award className={`w-12 h-12 ${passed ? "text-green-600" : "text-yellow-600"}`} />
        </div>
        <h2 className="mb-2">{passed ? "Congratulations!" : "Almost There!"}</h2>
        <p className="text-xl mb-4">
          You scored {score} out of {questions.length} ({percentage}%)
        </p>
        {passed ? (
          <Badge className="bg-green-600 text-white mb-4">Quiz Passed ✓</Badge>
        ) : (
          <Badge className="bg-yellow-600 text-white mb-4">Passing score: 80%</Badge>
        )}
        <p className="text-gray-600 mb-6">
          {passed
            ? "You've successfully completed the orientation module!"
            : "Please review the material and try again to achieve the passing score."}
        </p>
        {!passed && (
          <Button onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setCompleted(false);
            setShowResult(false);
            setSelectedAnswer(null);
          }}>
            Retake Quiz
          </Button>
        )}
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3>{title}</h3>
          <Badge variant="outline">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg mb-4">{question.question}</p>

        <RadioGroup
          value={selectedAnswer?.toString()}
          onValueChange={(value) => setSelectedAnswer(parseInt(value))}
          disabled={showResult}
        >
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors ${
                  showResult
                    ? index === question.correctAnswer
                      ? "border-green-500 bg-green-50"
                      : index === selectedAnswer
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                    : selectedAnswer === index
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
                {showResult && index === question.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                )}
                {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg mb-4 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          <p className={`mb-2 ${isCorrect ? "text-green-800" : "text-red-800"}`}>
            {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
          </p>
          <p className="text-sm text-gray-700">{question.explanation}</p>
        </div>
      )}

      <div className="flex gap-3">
        {!showResult ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="w-full"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="w-full">
            {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Quiz"}
          </Button>
        )}
      </div>
    </Card>
  );
}
