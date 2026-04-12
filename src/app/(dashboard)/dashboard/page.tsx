import { ProfileCard } from '@/components/dashboard/profile-card';
import { RecommendedJobs } from '@/components/dashboard/recommended-jobs';

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 w-full animate-in fade-in duration-500">
      <section>
        <ProfileCard />
      </section>
      
      <section>
        <RecommendedJobs />
      </section>
    </div>
  );
}
