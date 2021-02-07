import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider } from "styled-components";
import Seo from "./seo";
import Header from "./Header";
import Note from "./Note";
import Codepen from "./Codepen";
import ArticleLink from "./ArticleLink";
import Footer from "./Footer";
import SubscribeBanner from "./SubscribeBanner";
import ThemeContext from "../context/theme";
import Pre from "./Pre";
import themeColors from "../theme";
import ArticleHeading from "./ArticleHeading";

const Layout = ({ location, color, children, ...props }) => {
	const { theme } = useContext(ThemeContext);
	const mainRef = useRef();

	useEffect(() => {
		document.body.style.opacity = 1;
	});

	const skipToContent = () => {
		mainRef.current.focus();
	};

	return (
		<ThemeProvider theme={theme}>
			<Seo />
			<div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
				<a
					id="skip-link"
					href="#main"
					className="block absolute left-4 py-2 px-4 rounded-lg bg-gray-800 shadow-lg hover:shadow-2xl text-white transform -translate-y-full focus:translate-y-4"
					onClick={skipToContent}
				>
					Skip to content
				</a>
				<Header
					location={location}
					shell={props["*"] === "offline-plugin-app-shell-fallback"}
					color={color}
				/>
				<main
					id="main"
					tabIndex="-1"
					aria-label="Main Content"
					ref={mainRef}
					className="outline-none"
				>
					<MDXProvider
						components={{
							h1: props => <h1 className="text-4xl font-medium" {...props} />,
							h2: props => (
								<ArticleHeading
									color={color}
									className="mt-24 mb-6 text-3xl font-bold"
									{...props}
								/>
							),
							h3: props => <h3 className="mt-10 mb-6 text-2xl font-bold" {...props} />,
							h4: props => <h4 className="mt-8 mb-6 text-xl font-semibold" {...props} />,
							h5: props => <h5 className="mt-6 mb-6 text-lg font-semibold" {...props} />,
							h6: props => <h6 className="mt-4 mb-6 text-base font-semibold" {...props} />,
							p: props => <p className="mb-6 text-lg leading-normal" {...props} />,
							ul: props => <ul className="ml-5 mb-6 list-disc text-lg leading-normal" {...props} />,
							ol: props => <ol className="ml-5 mb-6 list-disc text-lg leading-normal" {...props} />,
							li: props => <li className="mb-2" {...props} />,
							figure: props => <figure className="bg-gray-50 dark:bg-gray-800" {...props} />,
							pre: props => (
								<Pre
									color={color}
									{...props}
									className={`overflow-x-auto my-8 -mx-8 sm:mx-0 p-8 sm:rounded-lg bg-gray-50 dark:bg-gray-800 text-base whitespace-pre-wrap text-gray-700 dark:text-gray-300 ${props.className}`}
								/>
							),
							code: props => <code className="font-mono text-sm" {...props} />,
							inlineCode: props => (
								<code
									{...props}
									className={`px-1 py-0.5 rounded text-base bg-gray-50 dark:bg-gray-800 ${themeColors[color].text}`}
								/>
							),
							a: props => (
								<a
									className={`text-xl font-medium hover:underline ${themeColors[color].text}`}
									style={{ textUnderlineOffset: "3px" }}
									{...props}
								/>
							),
							Note: props => <Note color={color} {...props} />,
							Codepen,
							ArticleLink
						}}
					>
						{children}
					</MDXProvider>
				</main>
				<Footer />
				<SubscribeBanner />
			</div>
		</ThemeProvider>
	);
};

Layout.propTypes = {
	location: PropTypes.object.isRequired
};

export default Layout;
