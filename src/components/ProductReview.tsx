import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from '@/redux/features/products/productApi';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

const dummyComments = [
  'Bhalo na',
  'Ki shob ghori egula??',
  'Eta kono product holo ??',
  '200 taka dibo, hobe ??',
];

export default function ProductReview() {
  const { id } = useParams();
  const { data } = useGetCommentsQuery(id as string);
  const [addComment, comment] = useAddCommentMutation();

  const [text, setText] = useState<string>('');

  const handlePostComment = async () => {
    const payload = { id, comment: text };
    await addComment(payload);
    comment.isSuccess && setText('');
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5 items-center">
        <Textarea
          className="min-h-[30px]"
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          className="rounded-full h-10 w-10 p-2 text-[25px]"
          onClick={handlePostComment}
        >
          <FiSend />
        </Button>
      </div>
      <div className="mt-10">
        {data?.comments?.map((comment, index) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
