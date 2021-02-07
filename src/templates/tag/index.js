import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import { motion } from "framer-motion";
import Heading from "../../components/Heading";
import Seo from "../../components/seo";
import PageTitle from "../../components/PageTitle";
import website from "../../../website-config";
import { shouldAnimate } from "../../helpers";
import { ArticlesWrap, BlogExcerpt, BlogExcerptWrap, Header, Links, TagIndexWrap } from "./styles";

const variants = {
	mounted: {
		transition: { staggerChildren: 0.05, delayChildren: 0.2 }
	}
};

const childVariants = {
	mounted: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 50,
			mass: 0.1
		}
	}
};

const TagRoute = ({
	location,
	data: {
		allMdx: { edges: posts }
	},
	pageContext: { tag }
}) => {
	const tagHeading = `${posts.length} post${posts.length === 1 ? "" : "s"} tagged with “${tag}”`;

	return (
		<>
			<Seo
				title={`Posts tagged with “${tag}“ | ${website.titleAlt}`}
				pathname={location.pathname}
				description="Stay update to date on the latest developments in HTML, CSS and Javascript. Read Jonathan Harrell's blog for tips, tricks and techniques."
			/>
			<TagIndexWrap>
				<Header>
					<div>
						<div>
							<motion.div
								initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
								animate={{ opacity: 1, y: 0 }}
								transition={{ type: "spring", stiffness: 50, mass: 0.1 }}
							>
								<PageTitle>
									<Heading level={1}>{tagHeading}</Heading>
								</PageTitle>
							</motion.div>
							<Links>
								<motion.div
									initial={shouldAnimate() ? { opacity: 0, y: 25 } : false}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										type: "spring",
										stiffness: 50,
										mass: 0.1,
										delay: 0.1
									}}
								>
									<Link to="/blog/" arrow={true} arrowPosition="left">
										See all articles
									</Link>
								</motion.div>
								<motion.div
									initial={shouldAnimate() ? { opacity: 0, y: 25 } : false}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										type: "spring",
										stiffness: 50,
										mass: 0.1,
										delay: 0.2
									}}
								>
									<Link to="/tags/" arrow={true} arrowPosition="right">
										Browse all tags
									</Link>
								</motion.div>
							</Links>
						</div>
					</div>
				</Header>
				<section id="articles" aria-labelledby="articles-label">
					<div>
						<span className="sr-only">
							<Heading level={2} id="articles-label">
								Articles
							</Heading>
						</span>
						<ArticlesWrap animate="mounted" variants={variants}>
							{posts &&
								posts.map(({ node: post }) => (
									<BlogExcerptWrap
										key={post.id}
										variants={childVariants}
										initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
									>
										<BlogExcerpt
											link={post.fields.slug}
											svg={post.frontmatter.featuredimage.fields.markup}
											date={new Date(post.frontmatter.date)}
											title={post.frontmatter.title}
											excerpt={post.frontmatter.description}
										/>
									</BlogExcerptWrap>
								))}
						</ArticlesWrap>
					</div>
				</section>
			</TagIndexWrap>
		</>
	);
};

TagRoute.propTypes = {
	location: PropTypes.object.isRequired,
	data: PropTypes.shape({
		allMdx: PropTypes.shape({
			edges: PropTypes.arrayOf(
				PropTypes.shape({
					node: PropTypes.shape({
						id: PropTypes.string.isRequired,
						fields: PropTypes.shape({
							slug: PropTypes.string.isRequired
						}).isRequired,
						frontmatter: PropTypes.shape({
							title: PropTypes.string.isRequired,
							description: PropTypes.string.isRequired,
							date: PropTypes.string.isRequired,
							featuredimage: PropTypes.shape({
								fields: PropTypes.shape({
									markup: PropTypes.string.isRequired
								})
							}).isRequired
						}).isRequired
					}).isRequired
				})
			).isRequired
		}).isRequired
	}).isRequired,
	pageContext: PropTypes.shape({
		tag: PropTypes.string.isRequired
	}).isRequired
};

export default TagRoute;

export const tagPageQuery = graphql`
	query TagPage($tag: String) {
		site {
			siteMetadata {
				title
			}
		}
		allMdx(
			limit: 1000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			edges {
				node {
					id
					fields {
						slug
					}
					frontmatter {
						title
						description
						templateKey
						date
						tags
						featuredimage {
							fields {
								markup
							}
						}
					}
				}
			}
		}
	}
`;
