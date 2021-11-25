 <template>
<div id="QuestionFAQ">

  <div v-for="(title, index) in titles">
    <h2 class="title text-center mb-3">{{title.title}}</h2><!-- End .title -->

    <div class="accordion accordion-rounded" :id="`accordion-${index}`">

      <div v-for="(question, qIndex) in title.questions">
        <div class="card card-box card-sm bg-light">
          <div class="card-header" :id="`heading-${index}-${qIndex}`">
            <h2 class="card-title">
              <a :class="index===0&&qIndex===0?'':'collapsed'" role="button" data-toggle="collapse" :href="`#collapse-${index}-${qIndex}`" aria-expanded="true" :aria-controls="`collapse-${index}-${qIndex}`">
                {{question.q}}
              </a>
            </h2>
          </div><!-- End .card-header -->
          <div :id="`collapse-${index}-${qIndex}`" class="collapse" :class="index===0&&qIndex===0?'show':''" :aria-labelledby="`heading-${index}-${qIndex}`" :data-parent="`#accordion-${index}`">
            <div class="card-body">
              {{question.a}}
              <div v-if="question.q === 'كم يستغرق شحن الطلبية ؟'">
                <a href="/shipping"> الضغط هنا</a>
              </div>
            </div><!-- End .card-body -->
          </div><!-- End .collapse -->
        </div><!-- End .card -->
      </div>

    </div><!-- End .accordion -->

  </div>

</div>
</template>

<script>
export default {
  name: "QuestionFAQ",
  props:{
    titles:{
      type:Array
    }
  }
}
</script>

<style scoped>

</style>
