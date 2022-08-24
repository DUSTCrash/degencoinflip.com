export const SocialLinks = ({ social }) => {
    return (
        <div className="text-center justify-content-center d-flex">
            <a href={social.marketplaceUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer me-2"><img src={`https://i.imgur.com/KRuxULB.png`} alt="marketplace" className="rounded mt-1" style={{ width: '32px', height: '20px' }} /></a>
            <a href={social.twitterUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer me-1"><i className="fab fa-2x fa-twitter text-twitter"></i></a>
            <a href={social.discordUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer me-1"><i className="fab fa-2x fa-discord text-discord"></i></a>
            {
                !!social.dfcUrl?.length &&
                <a href={social.dfcUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer"><img src={`https://i.imgur.com/LLhRskG.png`} alt="DFC" style={{ width: '30px', height: '30px' }} /></a>
            }
        </div>
    );
}