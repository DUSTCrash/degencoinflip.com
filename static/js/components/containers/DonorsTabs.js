import { timeAgo } from "../../utils/dates"

// const PASTEL_COLORS = [`#f4a200`, `#ff96d4`, `#678be5`, `#dffaff`, `#8c95ff`, `#1c1c1c`]

const sortFunc = (b, a) => {
    return (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0)
};

export const DonorsTabs = ({ posts, style }) => {
    return (
        <div className="container" id="custom-cards">
            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5 text-start">
                {
                    posts?.sort(sortFunc)?.map(post => (
                        <div className="col" key={post.walletId + post.modifiedAt}>
                            <div className={"card card-cover donation-card h-100 overflow-hidden rounded-5 shadow-sm border" + (style === "dark-black" ? " bg-dark" : "")}>
                                <div className="d-flex flex-column p-4 text-shadow-1">
                                    <ul className="d-flex list-unstyled mt-auto mb-0">
                                        <li className="">
                                            <img src={post.profileImageUrl} alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white" />
                                        </li>
                                        <li className="d-flex flex-column w-100">
                                            <h6 className="ms-2 mb-0">{post.nickname}
                                                {
                                                    post?.twitter?.length > 0 &&
                                                    <a href={`https://twitter.com/${post?.twitter}`} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-sm fa-twitter ms-2"></i></a>
                                                }
                                            </h6>
                                            {
                                                !post.hideAmount &&
                                                <small className="ms-2">Donated {post.donatedAmount} ◎ {timeAgo(post?.createdAt)}</small>
                                            }
                                            {
                                                post.hideAmount &&
                                                <small className="ms-2">Donated {timeAgo(post?.createdAt)}</small>
                                            }
                                        </li>
                                    </ul>
                                    {
                                        post.messageHtml?.length > 0 && 
                                        <div className="mt-3 border" dangerouslySetInnerHTML={{__html: post.messageHtml}} />
                                    }
                                    {
                                        !post.messageHtml?.length && 
                                        <h6 className="pt-2 mt-2 mb-2 lh-1 fw-bold">{post.message}</h6>
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}