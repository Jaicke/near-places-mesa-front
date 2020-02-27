<template>
  <div id="place-list">
		<v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row
            align="center"
            justify="center"
            class="grey lighten-5"
            style="height: 100%; padding: 25px"
          >
            <template v-if="places">
						  <Place v-for="place in places" :key="place.id" :place="place" />
            </template>

            <span v-else>Nenhum lugar cadastrado.</span>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import Place from './Place'

export default {
	name: "PlaceList",
	props: [ 'places' ],
	components: { Place }
}
</script>



