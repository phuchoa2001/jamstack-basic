import { useState } from 'react'
import PostPreview from './post-preview'
import { Input, Select, Col, Row, Pagination } from 'antd';
import { linkAvatar } from '../contant/userName'
import { removeVietnameseFromString } from '../utils/stringUtils'

const { Option } = Select;

type Props = {
	posts: any[]
}

const PAGE = 8;

const MoreStories = ({ posts }: Props) => {
	const [searchName, setSearchName] = useState('');
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [searchCategory, setSearchCategory] = useState('');

	const filteredPosts = posts.filter((post) => {
		const postTitle = removeVietnameseFromString(post.frontmatter.title.toLowerCase());
		const postCategory = post.frontmatter.category.toLowerCase();
		const searchNameLower = removeVietnameseFromString(search.toLowerCase());
		const searchCategoryLower = searchCategory.toLowerCase();

		return (
			postTitle.includes(searchNameLower) &&
			(searchCategoryLower === '' || postCategory.includes(searchCategoryLower))
		);
	});

	const indexOfLastPost = currentPage * PAGE;
	const indexOfFirstPost = indexOfLastPost - PAGE;
	const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

	const handleSearch = (value: string) => {
		setSearch(value);
		setCurrentPage(1)
	};

	const handleCategorySearch = (value: string) => {
		setSearchCategory(value);
		setCurrentPage(1)
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchName(e.target.value);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<section>
			<h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
				Danh sách bài viết
			</h2>
			<Row gutter={[16, 8]}>
				<Col className="mb-4" span={24} md={18}>
					<Input.Search
						placeholder="Tìm kiếm theo tên"
						value={searchName}
						onChange={handleChange}
						onSearch={handleSearch}
					/>
				</Col>
				<Col className="mb-8" span={24} md={6}>
					<Select
						placeholder="Tìm kiếm theo danh mục"
						value={searchCategory}
						className='w-full'
						onChange={handleCategorySearch}
					>
						<Option value="">Tất cả</Option>
						<Option value="category1">Danh mục 1</Option>
						<Option value="category2">Danh mục 2</Option>
						<Option value="category3">Danh mục 3</Option>
						{/* Thêm các option cho danh mục khác */}
					</Select>
				</Col>
			</Row>
			<div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
				{currentPosts.map((post) => {
					if (!post) {
						return <></>;
					}

					return (
						<Col className="mb-4" span={24} md={18} key={post.slug}>
							<PostPreview
								title={post.frontmatter.title}
								coverImage={post.frontmatter.image}
								date={post.date}
								tags={post.frontmatter.tags}
								author={{
									name: post.frontmatter.author,
									picture: linkAvatar,
								}}
								slug={'/' + post.frontmatter.slug}
								excerpt={post.frontmatter.desc}
							/>
						</Col>
					);
				})}
			</div>
			<div className='py-4'>
				<Pagination
					current={currentPage}
					total={filteredPosts.length}
					pageSize={PAGE}
					onChange={handlePageChange}
					className="text-center"
				/>
			</div>
		</section>
	)
}

export default MoreStories
