import React, { useState, useEffect } from 'react';
import { getSuggestedBlogs } from '../db/contentFeature';
import PostPreview from './post-preview';
import { linkAvatar } from '../contant/userName';

type Props = {
	post: any
}

function PostSuggestion(props: Props) {
	const [listSuggested, setListSuggested] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api');
				const jsonData = await response.json();

				const listSuggested = getSuggestedBlogs(props.post, 2, jsonData);
				setListSuggested(listSuggested)
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<section>
			<h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight my-4">
				Danh sách bài viết liên quan
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
				{listSuggested.map((post) => {

					if (!post) {
						return <div key={post.frontmatter.slug}></div>
					}

					return (
						<PostPreview
							key={post.frontmatter.slug}
							title={post.frontmatter.title}
							coverImage={post.frontmatter.image}
							date={post.date}
							tags={post.frontmatter.tags}
							author={{
								name: post.frontmatter.author,
								picture: linkAvatar
							}}
							slug={"/" + post.frontmatter.slug}
							excerpt={post.frontmatter.desc}
						/>
					)
				})}
			</div>
		</section>
	);
}

export default PostSuggestion;