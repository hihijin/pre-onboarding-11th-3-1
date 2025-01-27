import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { IssueContext } from '../contexts/IssueContext';
import MarkdownPreview from '@uiw/react-markdown-preview';

export default function IssueDetail() {
  const { getIssue } = useContext(IssueContext);
  const { id } = useParams();

  let issue;

  try {
    issue = getIssue(Number(id));
  } catch (error) {
    return <div>에러 화면</div>;
  }

  return (
    <div className='max-w-xl m-auto'>
      <h2 className='flex justify-between items-center hover:bg-slate-300  p-3 border-b-2'>
        <div className='w-14 h-14 rounded-lg overflow-hidden mr-4'>
          <img
            className='w-full h-full object-cover'
            src={issue.user?.avatar_url}
            alt='깃헙 프로필 이미지'
          />
        </div>
        <div>
          <h2 className='text-base'>{`#${issue.number} ${issue.title}`}</h2>
          <p className='text-sm'>
            {`작성자: ${issue.user?.login}, `}
            {`작성일: ${issue.created_at}`}
          </p>
        </div>
        <p>{`코멘트: ${issue.comments}`}</p>
      </h2>
      <div className='p-3'>
        <MarkdownPreview source={issue.body || ''} />
      </div>
    </div>
  );
}
