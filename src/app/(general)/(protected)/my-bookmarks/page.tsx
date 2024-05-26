import { getWishlistByUserId } from "@/actions/wishlist.action";
import JobCard from "@/components/cards/JobCard";
import { currentUser } from "@/lib/auth";

export default async function page() {
  const user = await currentUser();

  if (!user) {
    return;
  }

  const userWishlist = await getWishlistByUserId(user.id!);

  return (
    <section>
      <div className="container">
        <h2 className="text-center text-3xl font-semibold">My Bookmarks</h2>
        <div className="my-8 rounded-md border border-[#8efaef] bg-[#EAFCFF] p-4 text-[#3089CE]">
          <p>
            Your bookmarked internships/jobs will be automatically removed from
            here whenever their application deadline is over or application
            window is closed
          </p>
        </div>

        <div className="space-y-6">
          {userWishlist.length > 0 ? (
            userWishlist.map((item) => <JobCard key={item.id} job={item.job} />)
          ) : (
            <p>No Bookmarks</p>
          )}
        </div>
      </div>
    </section>
  );
}
