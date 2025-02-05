import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/clerk-react';

function Hero() {
	return (
		<div className="grow relative overflow-hidden py-24 lg:py-32">
			{/* Gradients */}
			<div
				aria-hidden="true"
				className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
			>
				<div className="bg-linear-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
				<div className="bg-linear-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
			</div>
			{/* End Gradients */}
			<div className="relative z-10">
				<div className="py-10 lg:py-16">
					<div className="max-w-2xl text-center mx-auto">
						<p className="">
							Not tomorrow.
							<br /> Not next week.
							<br />
							<br /> Get it done.
						</p>
						{/* Title */}
						<div className="mt-5 max-w-2xl">
							<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
								todizzle
							</h1>
						</div>
						<div className="mt-5 max-w-3xl">
							<p className="text-xl text-muted-foreground">
								A todo app for{' '}
								<code className="font-bold text-violet-500">$currentYear</code>.
							</p>
						</div>
						{/* Buttons */}
						<div className="mt-8 gap-3 flex justify-center">
							<SignInButton mode="modal">
								<Button size="lg" className="flex items-center justify-center gap-2">
									Get started
								</Button>
							</SignInButton>
							{/* <Button size="lg" variant="outline">
								Learn more
							</Button> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export function Landing() {
	return (
		<main className="grid">
			<Hero />
		</main>
	);
}
