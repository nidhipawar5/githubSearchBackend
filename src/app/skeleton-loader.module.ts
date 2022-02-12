import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    SkeletonLoaderModule
  ],
  imports: [
    
    NgxSkeletonLoaderModule,
    
  ],
  providers: [],
  bootstrap: [SkeletonLoaderModule]
})

export class SkeletonLoaderModule {}
