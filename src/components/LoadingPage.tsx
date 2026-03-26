function LoadingPage() {
  return (
    <div className='w-full h-full fixed top-0 left-0 flex flex-col items-center justify-center z-9 bg-white/60'>
        <svg xmlns="http://www.w3.org/2000/svg" className='w-16 h-16 text-[#212121] animate-spin' viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C16.9706 3 21 7.02944 21 12H19C19 8.13401 15.866 5 12 5V3Z"></path>
        </svg>
        <span className='text-sm font-semibold'>Loading...</span>
    </div>
  )
}

export default LoadingPage