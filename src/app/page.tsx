import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-bg-main font-sans min-h-screen">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-bg-card border border-border-main rounded-2xl sm:items-start my-8">
        <Image className="h-5 w-[100px] invert white:invert-0" src="/next.svg" alt="Next.js logo" width={100} height={20} priority />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-text-main">
            To get started, edit the <code className="rounded bg-bg-main px-1.5 py-0.5 font-mono text-[0.9em] border border-border-main text-primary">page.tsx</code> file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-text-muted">
            Looking for a starting point or more instructions? Head over to{' '}
            <a href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app" className="font-medium text-primary hover:underline">
              Templates
            </a>{' '}
            or the{' '}
            <a href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app" className="font-medium text-primary hover:underline">
              Learning
            </a>{' '}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-primary-text transition-colors hover:bg-primary-hover md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className="h-[14px] w-4 invert" src="/vercel.svg" alt="Vercel logomark" width={16} height={14} />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-border-main bg-bg-main text-text-main transition-colors hover:bg-border-main/50 md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
