export default function Loading() {
  return (
    <div className='flex items-center justify-center min-h-screen w-full'>
      <div
        className='h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin'
        role='status'
        aria-label='Loading'
      />
    </div>
  );
}
