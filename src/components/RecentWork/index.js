import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { shouldAnimate } from '../../helpers'
import { WorkExcerptItem, WorkExcerptWrap, RecentWorkWrap } from './styles'

const variants = {
  mounted: {
    transition: { staggerChildren: 0.05, delayChildren: 0.3 }
  }
}

const childVariants = {
  mounted: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      mass: 0.1
    }
  }
}

const RecentWork = ({
  data: {
    allMdx: { edges: posts }
  }
}) => {
  posts = posts.slice(0, 4)

  return (
    <RecentWorkWrap animate="mounted" variants={variants}>
      {posts &&
        posts.map(({ node: post }) => (
          <WorkExcerptWrap
            key={post.id}
            variants={childVariants}
            initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
          >
            <WorkExcerptItem
              link={post.fields.slug}
              date={new Date(post.frontmatter.date)}
              title={post.frontmatter.title}
              role={post.frontmatter.role}
              image={post.frontmatter.image}
              excerpt={post.frontmatter.description}
            />
          </WorkExcerptWrap>
        ))}
    </RecentWorkWrap>
  )
}

RecentWork.propTypes = {
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
              role: PropTypes.string.isRequired,
              date: PropTypes.string
            }).isRequired
          }).isRequired
        })
      ).isRequired
    }).isRequired
  }).isRequired
}

export default () => (
  <StaticQuery
    query={graphql`
      query RecentWorkQuery {
        # allMdx(
        #   limit: 5
        #   sort: { order: DESC, fields: [frontmatter___date] }
        #   filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        # ) {
        #   edges {
        #     node {
        #       excerpt(pruneLength: 150)
        #       id
        #       fields {
        #         slug
        #       }
        #       frontmatter {
        #         title
        #         description
        #         templateKey
        #         date
        #         tags
        #       }
        #     }
        #   }
        # }
        allMdx(
          limit: 5
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "project" } } }
        ) {
          edges {
            node {
              # excerpt(pruneLength: 150)
              id
              fields {
                slug
              }
              frontmatter {
                title
                role
                description
                # templateKey
                # date
                image: coverimage {
                  light {
                    childImageSharp {
                      fluid(maxWidth: 960, srcSetBreakpoints: [340, 680]) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                    publicURL
                  }
                  dark {
                    childImageSharp {
                      fluid(maxWidth: 960, srcSetBreakpoints: [340, 680]) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                    publicURL
                  }
                  shadow
                }
              }
            }
          }
        }
      }
    `}
    render={data => <RecentWork data={data} />}
  />
)
